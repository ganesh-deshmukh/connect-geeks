// users.js for authentication and authorization

const express = require("express");
const router = express.Router();

// @route       GET request to api/users/test
// @description Tests users route
// @access      Public, without login
router.get("/test", (req, res) => res.json({ msg: "Users Works" }));

module.exports = router;
