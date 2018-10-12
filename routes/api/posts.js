// contains post and replies as comments to posts.

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// bring Post model Schema
const Post = require("../../models/Post");

// validate post-data input
const validatePostInput = require("../../validation/post");

// @route       GET request to api/posts/test
// @description Tests posts route
// @access      Public, without login
router.get("/test", (req, res) => res.json({ msg: "Posts Works" }));

// @route       GET request to api/posts/test
// @description Tests posts route
// @access      Public, without login
router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(404));
});

// @route       POST request to api/posts
// @description Create Posts
// @access      Private, with login
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    // check validation
    if (!isValid) {
      // then it has errors, send error-code 400 and error object
      return res.status(400).json(errors);
    }
    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id
    });

    newPost.save().then(post => res.json(post));
  }
);

module.exports = router;
