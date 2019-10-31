const User = require('../models/User');

// @desc   Get all users
// @route   GET /api/v0/users
// @acess   Admin
exports.getUsers = (req, res, next) => {
  res.status(200).json({ sucess: true, msg: 'Show all Users' });
};

// @desc   Create user
// @route   POST /api/v0/users
// @acess   Private
exports.createUser = async (req, res, next) => {
  const user = await User.create(req.body, err => {
    if (err)
      return res.status(406).json({
        success: false,
        msg: err.message
      });
    else
      return res.status(201).json({
        success: true,
        data: user
      });
  });
  console.log(req.body);
};
