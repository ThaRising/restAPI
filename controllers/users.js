// @desc   Get all users
// @route   GET /api/v0/users
// @acess   Admin
exports.getUsers = (req, res, next) => {
  res.status(200).json({ sucess: true, msg: 'Show all Users' });
};
