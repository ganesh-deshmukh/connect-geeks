// contains post and replies as comments to posts.

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// bring Post model Schema
const Post = require("../../models/Post");

// bring Profile model Schema to validate post's owner
const Profile = require("../../models/Profile");

// validate post-data input
const validatePostInput = require("../../validation/post");

// @route       GET request to api/posts/test
// @description Tests posts route
// @access      Public, without login
router.get("/test", (req, res) => res.json({ msg: "Posts Works" }));

// @route       GET request to api/posts/
// @description Tests posts route
// @access      Public, without login
router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err =>
      res.status(404).json({ nopostfound: "Sorry, No any post found" })
    );
});

// @route       GET request to api/posts/:id
// @description Tests posts route for post of specific user
// @access      Public, without login
router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err =>
      res.status(404).json({ nopostfound: "Sorry, No post found with this ID" })
    );
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

// @route       DELETE request to api/posts/:id
// @description delete post of specific user
// @access      Private post, need to login
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        Post.findById(req.params.id).then(post => {
          // check for owner of post or not
          if (post.user.toString() !== req.user.id) {
            // means not same user who is owner of post
            return res
              .status(401)
              .json({ notautorized: "User not Authorized" });
          }

          // User = Owner of post, then delete that post
          post.remove().then(() => res.json({ success: true }));
        });
      })
      .catch(err =>
        res.status(404).json({ postnotfound: "No Post found to delete" })
      );
  }
);

// @route       POST request to api/like/:id
// @description Like post by id
// @access      Private post, need to login

router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          // first check user has already liked this post or not
          // we have only option to like and unlike, but not for dislike

          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length > 0
          ) {
            return res
              .status(400)
              .json({ alreadyliked: "User already liked this post" });
          }
          // means user haven't liked this post, then add user's id to array of posts.

          // Add user id to likes array
          post.likes.unshift({ user: req.user.id });
          // unshift adds element at starting index.
          // but adds only on server, we have to make those changes to database

          post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ postnotfound: "No post found" }));
    });
  }
);

// @route       POST request to api/unlike/:id
// @description Unlike post by id
// @access      Private post, need to login

router.post(
  "/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          // first check user has already liked this post or not
          // we have only option to like and unlike, but not for dislike

          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length === 0
          ) {
            return res
              .status(400)
              .json({ notyetliked: "You haven't  liked this post" });
          }
          // means user haven't liked this post, then add user's id to array of posts.

          // Get remove index from likes-array
          const removeIndex = post.likes
            .map(item => item.user.toString())
            .indexOf(req.user.id);

          // splice index from array to remove one element.
          post.likes.splice(removeIndex, 1);

          // save newly spliced array to disk now,
          post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ postnotfound: "No post found" }));
    });
  }
);

module.exports = router;
