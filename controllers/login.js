const passport = require('passport');
const user = require("../models/User")

module.exports.login = function(req, res) {
    passport.authenticate('local', { successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true }, function(err, user, info){
      var token;
      if (err) {
        res.status(404).json(err);
        return;
      }
      if(user){
        token = user.generateJwt();
        res.status(200);
        res.json({
          "token" : token
        });
      } else {
        res.status(401).json(info);
      }
    })(req, res);
  };