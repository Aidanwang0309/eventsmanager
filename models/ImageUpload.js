const mongoose = require("mongoose");

const ImageUploadSchema = mongoose.Schema({
  imageName: {
    type: String,
    default: "none",
    required: true
  },

  imageData: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("image", ImageUploadSchema);
