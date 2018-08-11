// contains indivisual's profile info and every other details.

const express = require("express");
const router = express.Router();

router.get("/test", (req, res) => res.json({ msg: "Profile works" }));

module.exports = router;
