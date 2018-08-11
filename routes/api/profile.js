// contains indivisual's profile info and every other details.

const express = require("express");
const router = express.Router();

// @route       GET request to api/profile/test
// @description Tests profile route
// @access      Private , needed to  login. after login you send token with request.
router.get("/test", (req, res) => res.json({ msg: "Profile works" }));

module.exports = router;
