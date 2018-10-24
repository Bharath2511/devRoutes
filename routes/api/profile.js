const router = require("express").Router();

//GET api/profile/test
//tests profile route
//public access
router.get("/test", (req, res) => {
  res.json({ msg: "profile works" });
});

module.exports = router;
