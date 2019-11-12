const User = require("../models/User");

// @desc   Get all users
// @route   GET /api/v0/users
// @access   Admin
exports.getUsers = (req, res, next) => {
  res.status(200).json({ success: true, msg: "Show all Users" });
};

// @desc   Get single user
// @route   GET /api/v0/users/:id
// @access   Public
exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(201).json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// @desc   Create user
// @route   POST /api/v0/users
// @access   Public
exports.createUser = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.create({
      username: username,
      email: email,
      password: password
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

/*
if (this._fields.password) { // <- I'm sure about this one, check in debugger the properties of this 
    this.update({}, { $set : { password: bcrypt.hashSync(this.getUpdate().$set.password) } });
}
*/

/*
if (this._update.$set.password) { this.update({}, { $set: { password: bcrypt.hashSync(this.getUpdate().$set.password)} }); }
*/

// @desc   Update user
// @route   PUT /api/v0/users/:id
// @access   Public
exports.updateUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.findById(req.params.id, function(err, doc) {
      if (username) {
        doc.username = username;
      }
      if (email) {
        doc.email = email;
      }
      doc.save();
      res.status(201).json({
        success: true,
        data: doc
      });
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};
