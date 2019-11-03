const User = require('../models/User');

// @desc   Register user
// @route   POST /api/v0/auth/register
// @access   Public
exports.signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const user = await User.create({
    username: username,
    email: email,
    hash: password
  });
  const token = user.toAuthJSON();
  res.status(201).json({
    success: true,
    token
  });
};
