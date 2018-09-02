const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const mongoose = require("mongoose");
const User = mongoose.model("users");
// in User.js model file it contains mongoose.model('users', UserSchema);

const keys = require("../config/keys");

const opts = {}; // options

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      // console.log(jwt_payload);
      //jwt_payload returns object with token properties
      User.findById(jwt_payload.id)
        .then(user => {
          if (user) {
            // if user is found by id then return done function
            return done(null, user);
            // done(error,user)
          }
          return done(null, false);
          // user= not found = false;
        })
        .catch(err => {
          console.log(err);
        });

      console.log(jwt_payload);
    })
  );
};
