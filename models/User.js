const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const uniqueValidator = require('mongoose-unique-validator');

// Load Environment Variables
dotenv.config({ path: './config/config.env' });

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      required: [true, 'A username is required for signup.'],
      minlength: [3, 'Name may not be shorter than 3 characters.'],
      maxlength: [15, 'Name may not be longer than 15 characters.'],
      match: [
        /^([^_\W]*)$/i,
        'Usernames may not contain non word characters and spaces.',
      ],
    },
    tag: Number,
    slug: {
      type: String,
      unique: true,
      index: true,
    },
    email: {
      type: String,
      unique: true,
      uniqueCaseInsensitive: true,
      required: [true, 'Please add an email adress'],
      match: [
        /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
        'Please add a valid email adress',
      ],
    },
    country: String,
    role: {
      type: String,
      default: 'user',
      enum: ['user', 'developer'],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    password: {
      type: String,
      required: [true, 'A Password is required for signup!'],
      index: true,
      minlength: [
        6,
        'Please use a Password that is at least 6 characters long',
      ],
      maxlength: [30, 'Passwords may not be longer than 30 characters!'],
      match: [/^([^\s]*)$/, 'No Whitespaces may be used in passwords!'],
    },
  },
  { autoIndex: false },
);

UserSchema.plugin(uniqueValidator, {
  message: 'Error, a User with the {PATH} {VALUE} already exists',
});

// Validate user password
UserSchema.methods.validPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generate session token
UserSchema.methods.generateJWT = function() {
  const today = new Date();
  const exp = new Date(today);
  exp.setDate(today.getDate() + process.env.JWT_EXPIRE);
  return jwt.sign(
    {
      id: this._id,
      email: this.email,
      exp: parseInt(exp.getTime() / 1000),
    },
    process.env.JWT_SECRET,
  );
};

// Return session token and user data to frontend
UserSchema.methods.toAuthJSON = function() {
  return {
    token: this.generateJWT(),
  };
};

// Generate unique tag for duplicate usernames
UserSchema.methods.generateTag = async function() {
  const promise = await this.constructor
    .find({
      username: { $regex: new RegExp('^' + this.username + '$', 'i') },
      _id: { $ne: this._id },
    })
    .sort({ tag: -1 })
    .limit(1)
    .exec();
  return promise.length ? Number(promise[0].tag) + 1 : Number(1000);
};

// Generate slug from username
UserSchema.methods.generateSlug = function() {
  return this.username
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .concat(`-${this.tag}`);
};

// Pre-Save middleware
UserSchema.pre('save', async function(next) {
  this.tag = await this.generateTag();
  this.slug = this.generateSlug();
  // Encrypt Password
  this.password = await bcrypt.hash(this.password, await bcrypt.genSalt(10));
});

// Saves on Update
UserSchema.post('findOneAndUpdate', async function(doc, next) {
  await doc.save();
  next();
});

// Throws errors for trycatch
UserSchema.post('save', function(error, doc, next) {
  if (error) {
    next(error);
  }
});

module.exports = mongoose.model('User', UserSchema, 'users');
