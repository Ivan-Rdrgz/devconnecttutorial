const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
//Load user model
const User = require("../../models/User");

// @route   GET api/auth/test
// @desc    Tests auth route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "auth works" }));

// @route   GET api/auth/register
// @desc    Registers user route
// @access  Public
router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists!" });
    } else {
      const avatar = gravatar.url({
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

// @route   GET api/auth/login
// @desc    Login user / return JWT Token
// @access  Public
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email }).then(user => {
    if (!user) {
      return res.status(404).json({ email: "user not found!" });
    }
    bcrypt.compare(password, user.password).then(didMatch => {
      if (didMatch) {
        //user matched / create jwt payload
        const payload = {
          id: user.id,
          name: user.name,
          avatar: user.avatar
        };
        //sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            if (err) throw err;
            res.json({
              sucess: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res.status(400).json({ password: "password is incorrect" });
      }
    });
  });
});

// @route   GET api/auth/current
// @desc    Return user for current token
// @access  Private

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
