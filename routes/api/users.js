const router = require("express").Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

//load input validations
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
//loading models
const User = require("../../models/User");

//GET api/users/test
//tests users route
//public access

router.get("/test", (req, res) => {
  res.json({ msg: "users works" });
});

//GET api/users/register
//register users
//public access
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  //check validation
  //there are errors isValid is false
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "email already exists";
      return res.status(400).json(errors);
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200", //size
        r: "pg", //rating
        d: "mm" //default
      });
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

//GET api/users/login
//login users
//public access
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  //check validation
  //there are errors isValid is false
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;
  //find the user by email
  User.findOne({ email }).then(user => {
    //check for user
    if (!user) {
      errors.email = "user not found";
      return res.status(404).json(errors);
    }
    //check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        //user matched
        const payload = {
          id: user.id,
          name: user.name,
          avatar: user.avatar
        }; //create jwt payload
        //sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        errors.password = "password incorrect";
        return res.status(400).json(errors);
      }
    });
  });
});

//GET api/users/current
//return current users
//private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);

module.exports = router;
