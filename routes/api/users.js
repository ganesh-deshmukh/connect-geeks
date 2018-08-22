// users.js for authentication and authorization

const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const keys = require("../../config/keys");
const jwt = require("jsonwebtoken");
const passport = require("passport");

// Load User Model to check existing email is used for registration or not?
const User = require("../../models/User");

// @route       GET request to api/users/test
// @description Tests users route
// @access      Public, without login
router.get("/test", (req, res) => res.json({ msg: "Users Works" }));

// @route       GET request to api/users/register
// @description new registration of user.
// @access      Public, without login first register

router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email value exists already." });
    } else {
      console.log("no user found of this email in DB");
      const avatar = gravatar.url(req.body.email, {
        s: "200", //Size of gravatar in pixels
        r: "pg", //rating,
        d: "mm" //default value= 'mm'
      });
      // create user
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password
      });

      // gensalt(noOfSalts_of_Iterations,(err,salt_result)=>{})
      bcrypt.genSalt(10, (err, salt) => {
        // hash(plaintext,salt,callback(err,resultant ciphertext))
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) {
            console.log("error in bcrypt.hash()");
            throw err;
          }
          //assign salted hash to password
          newUser.password = hash;

          // Save new password in datebase, overriding plaintext;
          newUser
            .save()
            .then(user => res.json(user)) // if yes,then send it as argument in brackets.
            .catch(err =>
              console.log("Error occured in saving hash password in DB\n")
            );
        });
      });
    }
  });
});

// @route       GET request to api/users/login
// @description Login/signing-in registered user. return JWT token
// @access      Public

router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  // find user to match it's password
  User.findOne({ email: req.body.email }).then(user => {
    //check if no user
    if (!user) {
      return res.status(404).json({ email: "User's email   found." });
    }

    // else if do this..

    // if user's email-id is found then match it's password-hash with local-database
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // user pswd matched => then return JWT token back for authentication
        // res.json({ msg: "Success" });
        const payload = { it: user.id, name: user.name, avatar: user.avatar };

        // created JWT token
        // now sign token
        // jwt.sign(payload, secretKey, expire-time, callback );

        // jwt.sign

        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        // pswd doesn't matched
        return res.status(400).json({ password: "Password didn't match" });
      }
    });
  });
});

// @route       GET request to api/users/current  - current user with token
// @description Return current user
// @access      Private, can't go without login

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({ msg: "Success" });
  }
);

module.exports = router;
