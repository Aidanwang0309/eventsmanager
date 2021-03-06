const Event = require('../models/Event');
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');

// @route POST api/users
// @desc Register a user
// access Public

router.post(
  '/',
  [
    check('name', 'Please add name')
      .not()
      .isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ status: 400, errors: errors.array() });
    }

    const { name, email, password } = req.body;
    try {
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ status: 400, msg: 'User already exists' });
      }

      user = new User({
        name,
        email,
        password
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);
      user.avatar = `https://ui-avatars.com/api/?name=${name}`;

      await user.save();
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

router.put('/update', auth, async (req, res) => {
  const { _id, name, email, avatar, date, goingEvents } = req.body;

  // Build user object
  const userField = {};
  if (name) userField.name = name;
  if (email) userField.email = email;
  if (avatar) userField.avatar = avatar;
  if (date) userField.date = date;
  if (goingEvents) userField.goingEvents = goingEvents;

  try {
    let user = await User.findById(_id);
    if (!user) return res.status(404).json({ msg: 'user not found' });
    user = await User.findByIdAndUpdate(
      _id,
      { $set: userField },
      { new: true }
    ).populate({
      model: Event,
      path: 'goingEvents'
    });
    res.json({ status: 200, user });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
