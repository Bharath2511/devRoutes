const router = require("express").Router();

//GET api/posts/test
//tests post route
//public access
router.get("/test", (req, res) => {
  res.json({ msg: "posts works" });
});

module.exports = router;
