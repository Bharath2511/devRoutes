const router = require("express").Router();

//GET api/users/test
//tests users route
//public access

router.get("/test", (req, res) => {
  res.json({ msg: "users works" });
});

module.exports = router;
