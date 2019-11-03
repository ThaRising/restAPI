const User = require('../models/User');

// @desc   Register user
// @route   POST /api/v0/auth/register
// @access   Public
exports.signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.create({
      username: username,
      email: email,
      hash: password
    });
    res.status(201).json({
      success: true,
      token: user.toAuthJSON()
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};
