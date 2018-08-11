// contains post and replies as comments to posts.

const express = require("express");
const router = express.Router();

// @route       GET request to api/posts/test
// @description Tests posts route
// @access      Public, without login
router.get("/test", (req, res) => res.json({ msg: "Posts Works" }));
module.exports = router;
