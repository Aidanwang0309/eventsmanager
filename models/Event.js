const mongoose = require("mongoose");

const EventSchema = mongoose.Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  },

  name: {
    type: String,
    required: true
  },

  date: {
    type: String,
    required: true
  },

  location: {
    type: String,
    required: true
  },

  type: {
    type: String,
    default: "rave"
  },

  poster: {
    type: String,
    default: "image-1567892895906.png"
  },

  attendees: []
});

module.exports = mongoose.model("event", EventSchema);
