const mongoose = require('mongoose');

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
        'Usernames may not contain non word characters and spaces.'
      ]
    },
    tag: Number,
    slug: {
      type: String,
      unique: true,
      index: true
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Please add an email adress'],
      match: [
        /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
        'Please add a valid email adress'
      ]
    },
    country: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  { autoIndex: false }
);

UserSchema.methods.generateTag = async function() {
  const promise = await this.constructor
    .find({ username: this.username })
    .sort({ tag: -1 })
    .limit(1)
    .exec();
  return promise.length ? Number(promise[0].tag) + 1 : Number(1000);
};

UserSchema.methods.generateSlug = function() {
  return this.username
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .concat(`-${this.tag}`);
};

UserSchema.pre('save', async function() {
  this.tag = await this.generateTag();
  this.slug = await this.generateSlug();
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
