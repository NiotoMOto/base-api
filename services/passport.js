const jwt = require('jsonwebtoken');
const passport = require("passport");
const passportJWT = require("passport-jwt");
const config = require('../config');

const User = require('mongoose').model('Users');


var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;
var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = config.secretOrKey;

const strategy = new JwtStrategy(jwtOptions, function(payload, next) {
  User.findById(payload.id, (err, user) => {
    if(err || !user) {
      next(null, false);
    }else{
      next(null, user);
    }
  })
});

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(strategy);

module.exports = passport;