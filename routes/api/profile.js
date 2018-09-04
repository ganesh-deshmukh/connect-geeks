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

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // make errors array to send, if any occurs.

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

// @route       POST request to api/profile/tokenID-encrypted- secured instead of profile-id
// @description Create new user's  profile
// @access      Private , needed to  login. after login you send token with request.

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // Get all fields through req.body -
    // to edit specific and return others as it must return unchanged values.
    const profileFields = {}; // empty object
    profileFields.user = req.user.id; // contains avatar, name, id

    // handle = username
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.githubusername)
      profileFields.githubusername = req.body.githubusername;

    // skills is array of vales as csv-comma separated values
    if (typeof req.body.skills !== undefined) {
      profileFields.skills = req.body.skills.split(","); // remove commas
    }
    // else
    ///Social
    profilesfields.social = {};
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.stackoverflow)
      profileFields.social.stackoverflow = req.body.stackoverflow;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
  }
);

module.exports = router;
