const express = require('express');
const router = express.Router();

router.get("/index", function (req, res) {
  res.render("index"); // WIth the help of ejs
});

router.get("/about", function (req, res) {
  res.render("about");
});

module.exports = router;