// contains indivisual's profile info and every other details.

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Load Profile model from db
const Profile = require("../../models/Profile");

// Load User model from db
const User = require("../../models/User");

// @route       GET request to api/profile/test
// @description Tests profile route
// @access      Private , needed to  login. after login you send token with request.
router.get("/test", (req, res) => res.json({ msg: "Profile works" }));

// @route       GET request to api/profile/tokenID-encrypted- secured instead of profile-id
// @description get current user's  profile route
// @access      Private , needed to  login. after login you send token with request.

// router.get('/') => means router.get('/api/profile/') as this is default setup relatively.

// router.get(
//   "/",
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     // make errors array to send, if any occurs.
//     const errors = {};

//     Profile.findOne({ user: req.user.id })
//       .then(profile => {
//         if (!profile) {
//           errors.noprofile = "There is no any profile of this username";
//           return res.status(404).json(errors);
//         }
//         // else
//         res.json(profile);
//       })
//       .catch(err => {
//         res.status(404).json(err);
//       });
//   }
// );

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.user.id })
      .populate("user", ["name", "avatar"])
      .then(profile => {
        if (!profile) {
          errors.noprofile = "There is no profile for this user";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

//
//
//

module.exports = router;
