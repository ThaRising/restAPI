const passport = require('passport');
const User = require("../models/User")

module.exports.login = function(req, res, next) {
    passport.authenticate('local', { successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true }, function(err, user, info){
      if (err) {
        res.status(404).json(err);
      }
      if(user){
        res.status(200).json({
          "token" : User.generateJwt()
        });
      } else {
        res.status(401).json(info);
      }
    })(req, res);
  };