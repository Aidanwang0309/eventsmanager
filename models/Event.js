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
    type: String
  },

  attendees: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }]
  }
});

module.exports = mongoose.model("event", EventSchema);
