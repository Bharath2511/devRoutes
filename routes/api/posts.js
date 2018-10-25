const router = require("express").Router();
const mongoose = require("mongoose");
const passport = require("passport");

//validation
const validatePostInput = require("../../validation/post");
//loading models
const Post = require("../../models/Post");

//GET api/posts/test
//tests post route
//public access
router.get("/test", (req, res) => {
  res.json({ msg: "posts works" });
});

//GET api/posts
//get posts
//private access
router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json(err));
});

//POST api/posts
//create posts
//private access
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    //check validation
    if (!isValid) {
      //if any errors
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

module.exports = router;
