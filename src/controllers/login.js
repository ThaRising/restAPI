const passport = require('passport');
require('../config/passport')(passport);

module.exports.login = function(req, res, next) {
	try {
		passport.authenticate(
			'local',
			{
				successRedirect: '/',
				failureRedirect: '/login',
				failureFlash: true
			},
			function(err, user, info) {
				if (err) {
					res.status(404).json(err);
				}
				if (user) {
					res.status(200).json(user.toAuthJSON());
				} else {
					res.status(401).json(info);
				}
			}
		)(req, res, next);
	} catch (error) {
		res.status(400).json({
			success: false,
			error: error.message
		});
	}
};
