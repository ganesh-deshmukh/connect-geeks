// contains indivisual's profile success and every other details.

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Import validation file for profile-validation
const validateProfileInput = require("../../validation/profile");
const validateExperienceInput = require("../../validation/experience");
const validateEducationInput = require("../../validation/education");

// Load Profile model from db
const Profile = require("../../models/Profile");

// Load User model from db
const User = require("../../models/User");

// @route       GET request to api/profile/test
// @description Tests profile route
// @access      Private , needed to  login. after login you send token with request.
router.get("/test", (req, res) => res.json({ msg: "Profile works" }));

// @route       GET request to api/profile/user/:user_id
// @description get handle-success without login, by using user-id
// @access      Public, no need to login.
router.get("/user/:user_id", (req, res) => {
  const errors = {};

  Profile.findOne({ user: req.params.user_id })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "No any Profile found on this user-ID";
        res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(error => {
      res
        .status(404)
        .json({ profile: "There is no profile found for this ID" });
    });
});

// @route       GET request to api/profile/all
// @description get all profiles without login
// @access      Public, no need to login.
router.get("/all", (req, res) => {
  const errors = {};
  Profile.find()
    .populate("user", ["name", "avatar"])
    .then(profiles => {
      if (!profiles) {
        errors.noprofile = "There is no any profile";
        return res.status(404).json(errors);
      } else {
        res.json(profiles);
      }
    })
    .catch(err => {
      res.status(404).json({ profile: "There is no any profile" });
    });
});

// @route       GET request to api/profile/handle/:handle
// @description get handle-success without login
// @access      Public, no need to login.
router.get("/handle/:handle", (req, res) => {
  const errors = {};
  Profile.findOne({ handle: req.params.handle })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "No any Profile found on this handle";
        res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(error => {
      res.status(404).json(error);
    });
});

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
// @description Create new user's or Update-Edit  profile
// @access      Private , needed to  login. after login you send token with request.

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body); // pass input data

    // Check Validation output
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

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
    if (typeof req.body.skills !== "undefined") {
      profileFields.skills = req.body.skills.split(",");
    }
    // else
    ///Social
    profileFields.social = {};
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.stackoverflow)
      profileFields.social.stackoverflow = req.body.stackoverflow;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        // means you are updating og profile
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true } // new- flag to return or not new object or old object
        ).then(profile => res.json(profile));
      } else {
        // create new profile, as it was not found
        // check new handle(name), must be different than registered for SEO purpose
        Profile.findOne({ handle: profileFields.handle }).then(profile => {
          if (profile) {
            // old profile is existed alredy
            errors.handle =
              "Sorry, same profileurl/ handle is registered already";

            res.status(400).json(errors);
          }

          // save profile either edited or new

          new Profile(profileFields).save().then(profile => res.json(profile));
        });
      }
    });
  }
);

//  experience and education are separate form each other and they are arrays not collections.

// @route       POST request to api/experience route
// @description Add experience details to your profile
// @access      Private , needed to  login. after login you send token with request.
router.post(
  "/experience",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateExperienceInput(req.body); // pass input data

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id }).then(profile => {
      // create newExp as Object and later add that object to profile-details array.
      const newExp = {
        title: req.body.title,
        company: req.body.company,
        location: req.body.location,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      };

      // no collection named as 'Experience', we will add it in our profile-collection Exp-array.
      // add at begginning by unshift
      profile.experience.unshift(newExp);
      profile.save().then(profile => res.json(profile));
    });
  }
);

// @route       POST request to api/education route
// @description Add education details to your profile
// @access      Private , needed to  login. after login you send token with request.
router.post(
  "/education",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateEducationInput(req.body); // pass input data

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id }).then(profile => {
      // create newExp as Object and later add that object to profile-details array.
      const newExp = {
        school: req.body.school,
        degree: req.body.degree,
        fieldofstudy: req.body.fieldofstudy,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      };

      // no collection named as 'Education', we will add it in our profile-collection Education-array.
      // add at begginning by unshift
      profile.education.unshift(newExp);
      profile.save().then(profile => res.json(profile));
    });
  }
);

// @route       DELETE request to api/experience/:exp_id route
// @description Delete the experience details of your profile
// @access      Private , needed to  login. after login you send token with request.
router.delete(
  "/experience/:exp_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        // first get that index to remove it, using map()
        const removeIndex = profile.experience
          .map(item => item.id)
          .indexOf(req.params.exp_id);

        // now, splice your array and take that element-out of your array.
        profile.experience.splice(removeIndex, 1);

        // save remaining array and return that profile through json()
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route       DELETE request to api/education/:exp_id route
// @description Delete the education details of your profile
// @access      Private , needed to  login. after login you send token with request.
router.delete(
  "/education/:edu_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        // first get that index to remove it, using map()
        const removeIndex = profile.education
          .map(item => item.id)
          .indexOf(req.params.edu_id);

        // now, splice your array and take that element-out of your array.
        profile.education.splice(removeIndex, 1);

        // save remaining array and return that profile through json()
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route       Delete-Profile route from '/api/profile' or relative path= '/'.
// @description Remove Profile and User as well, after finding from db.
// @access      Private , needed to  login. after login you send token with request.
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id }) // Profile model has field user
      .then(() => {
        User.findOneAndRemove({ _id: req.user.id }) // User model has field _id
          .then(() => res.json({ success: true }));
      });
  }
);

module.exports = router;
