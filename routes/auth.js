const User = require('../models/User');
const Event = require('../models/Event');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

// @route Get api/auth
// @desc Get Logged in user
// access Private

router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select('-password')
      .populate({
        model: Event,
        path: 'goingEvents'
      });
    // console.log(user);
    res.json({ status: 200, user });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ status: 500, msg: 'Server Error' });
  }
});

// @route POST api/auth
// @desc Auth user and Get token
// access Public

router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
  ],
  async (req, res) => {
    // check validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ status: 400, errors: errors.array() });
    }
    // check credentials
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({
          status: 400,
          msg: 'Invalid Credentials'
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({
          status: 400,
          msg: 'Invalid Credentials'
        });
      }
      // check jwt token
      const payload = {
        user: {
          id: user.id
        }
      };
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        {
          expiresIn: 360000
        },
        (err, token) => {
          if (err) throw err;
          res.json({ status: 200, token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send({ status: 500, msg: 'Server Error' });
    }
  }
);

module.exports = router;
