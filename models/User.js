const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Please add a username'],
      unique: false,
      trim: true,
      maxlength: [20, 'Name may not be longer than 20 characters'],
      match: [/^\S*$/, 'Please add a valid username']
    },
    tag: {
      type: Number,
      unique: true
    },
    slug: String,
    email: {
      type: String,
      index: true,
      required: [true, 'Please add an email adress'],
      unique: true,
      match: [
        /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
        'Please add a valid email adress'
      ]
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    country: String
  },
  { autoIndex: false }
);

UserSchema.methods.generateSlug = function() {
  return this.username
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
};

UserSchema.pre('save', async function() {
  this.slug = await this.generateSlug();
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
