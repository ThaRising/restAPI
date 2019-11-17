const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

function initialize(passport) {
	passport.use(
		new LocalStrategy({ usernameField: 'email' }, function(email, password, done) {
			User.findOne({ email: email }, function(err, user) {
				if (err) {
					return done(err);
				}
				if (!user) {
					return done(null, false, {
						message: 'User not found'
					});
				}
				if (!user.validPassword(password)) {
					return done(null, false, {
						message: 'Password is wrong'
					});
				}
				return done(null, user);
			});
		})
	);
	passport.serializeUser((user, done) => done(null, user._id));
	passport.deserializeUser((id, done) => {
		return done(null, User.findOne({ _id: id }));
	});
}

module.exports = initialize;
