// users.js for authentication and authorization

const express = require("express");
const router = express.Router();
const gravator = require("gravator");
const bcrypt = require("bcryptjs");

// Load User Model to check existing email is used for registration or not?
const User = require("../../models/User");

// @route       GET request to api/users/test
// @description Tests users route
// @access      Public, without login
router.get("/test", (req, res) => res.json({ msg: "Users Works" }));

//
// @route       GET request to api/users/register
// @description new registration of user.
// @access      Public, without login first register

router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email value exists already." });
    } else {
      const avator = gravator.url(req.body.email, {
        s: "200", //Size of gravator in pixels
        r: "pg", //rating,
        d: "mm" //default value= 'mm'
      });
      // create user
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avator,
        password: req.body.password
      });
      // gensalt(noOfSalts_of_Iterations,(err,salt_result)=>{})
      bcrypt.genSalt(10, (err, salt) => {
        // hash(plaintext,salt,callback(err,resultant ciphertext))
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) {
            throw err;
          }
        });
      });
    }
  });
});

module.exports = router;
