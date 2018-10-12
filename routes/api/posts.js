// contains post and replies as comments to posts.

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// bring Post model Schema
const Post = require("../../models/Post");

// @route       GET request to api/posts/test
// @description Tests posts route
// @access      Public, without login
router.get("/test", (req, res) => res.json({ msg: "Posts Works" }));
module.exports = router;

// @route       GET request to api/posts
// @description Create Posts
// @access      Private, with login
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const newPost = new Post({
      text: req.user.text,
      name: req.user.name,
      avatar: req.user.name,
      user: req.user.id
    });

    newPost.save().then(post => res.json(post));
  }
);
