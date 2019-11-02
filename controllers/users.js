const User = require('../models/User');

// @desc   Get all users
// @route   GET /api/v0/users
// @access   Admin
exports.getUsers = (req, res, next) => {
  res.status(200).json({ success: true, msg: 'Show all Users' });
};

// @desc   Create user
// @route   POST /api/v0/users
// @access   Private
exports.createUser = async (req, res, next) => {
  const user = User.create(
    {
      username: req.body.username,
      email: req.body.email,
      hash: req.body.password
    },
    err => {
      if (err)
        return res.status(400).json({
          success: false,
          error: err.message
        });
      else
        return res.status(201).json({
          success: true,
          data: {
            username: req.body.username,
            email: req.body.email
          }
        });
    }
  );
};
