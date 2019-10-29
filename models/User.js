const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Please add a username'],
      unique: false,
      trim: true,
      maxlength: [20, 'Name may not be longer than 20 characters']
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

const User = mongoose.model('User', userScheme);

module.exports(User);
