const Event = require('../models/Event');
const User = require('../models/User');
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');

// @route Get api/events
// @desc Get all events
// access Public

router.get('/', async (req, res) => {
  try {
    const events = await Event.find()
      .sort({ date: 1 })
      .populate({
        model: User,
        path: 'attendees'
      });
    res.json({ status: 200, events });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ status: 200, msg: 'Server Error' });
  }
});

// @route Get api/events/:id
// @desc event info by id
// access Public

router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findOne({ _id: req.params.id }).populate({
      model: User,
      path: 'attendees'
    });
    res.json({ status: 200, event });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ status: 500, msg: 'Server Error' });
  }
});

// @route Post api/events
// @desc Add new event
// access Private

router.post(
  '/',
  auth,
  [
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('date', 'date is required')
      .not()
      .isEmpty(),
    check('location', 'location is required')
      .not()
      .isEmpty(),
    check('type', 'type is required')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, date, location, type, poster } = req.body;

    try {
      const newEvent = new Event({
        name,
        date,
        location,
        type,
        poster,
        creator: req.user.id,
        attendees: []
      });
      const event = await newEvent.save();
      res.json({ status: 200, event });
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route Put api/events:id
// @desc Update event
// access Private

router.put('/:id', auth, async (req, res) => {
  const { name, date, location, type, poster, attendees } = req.body;

  // Build event object
  const eventFields = {};
  if (name) eventFields.name = name;
  if (date) eventFields.date = date;
  if (location) eventFields.location = location;
  if (type) eventFields.type = type;
  if (attendees) eventFields.attendees = attendees;
  if (poster) eventFields.poster = poster;

  try {
    let event = await Event.findById(req.params.id);

    if (!event) return res.status(404).json({ msg: 'event not found' });

    // if (event.creator.toString() !== req.user.id) {
    //   return res.status(401).json({ msg: "Not authorized" });
    // }

    event = await Event.findByIdAndUpdate(
      req.params.id,
      { $set: eventFields },
      { new: true }
    ).populate({
      model: User,
      path: 'attendees'
    });

    res.json({ status: 200, event });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route Delete api/events:id
// @desc delete event
// access private

router.delete('/:id', auth, async (req, res) => {
  try {
    let event = await Event.findById(req.params.id);

    if (!event) return res.status(404).json({ msg: 'event not found' });

    if (event.creator.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await Event.findByIdAndRemove(req.params.id);
    res.json({ status: 200, msg: 'Event removed' });
  } catch (err) {
    console.error(er.message);
    res.status(500).send('Server Error');
  }
});

// @route Get api/events
// @desc Get users' events
// access Private

// router.post("/", (req, res) => {
//   res.send("register user");
// });

module.exports = router;
