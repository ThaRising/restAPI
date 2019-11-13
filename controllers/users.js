const User = require('../models/User');

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

// @desc   Update user
// @route   PUT /api/v0/users/:id
// @access   Public
exports.updateUser = async (req, res, next) => {
	try {
		const user = await User.findByIdAndUpdate(req.params.id, req.body, {
			runValidators: true,
			new: true,
			context: 'query'
		});
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

// @desc   Delete user
// @route   DELETE /api/v0/users/:id
// @access   Public
exports.deleteUser = async (req, res, next) => {
	try {
		await User.findByIdAndDelete(req.params.id);
		res.status(410).json({
			success: true
		});
	} catch (error) {
		res.status(400).json({
			success: false,
			error: error.message
		});
	}
};
