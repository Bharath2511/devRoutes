const router = require("express").Router();
const mongoose = require("mongoose");
const passport = require("passport");

//load models
const Profile = require("../../models/Profile");
const User = require("../../models/User");
//GET api/profile/test
//tests profile route
//public access
router.get("/test", (req, res) => {
  res.json({ msg: "profile works" });
});

//GET api/profile
//get current user's profile
//private access
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    //token is gonna put user into req.user
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (!profile) {
          errors.noprofile = "There is no profile for this user";
          return res.status(404).json(errors);
        }
        //literally its else
        res.send(200).json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

module.exports = router;
