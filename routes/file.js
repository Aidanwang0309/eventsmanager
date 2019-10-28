const Image = require("../models/ImageUpload");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Grid = require("gridfs-stream");
const conn = mongoose.connection;
const auth = require("../middleware/auth");
let gfs;

conn.once("open", function() {
  gfs = Grid(conn.db, mongoose.mongo);
  //set collection name to lookup into
  gfs.collection("myImage");
});

// @route GET file/:filename
// @desc  get an image
// access PUBLIC

router.get("/:filename", async (req, res) => {
  // First check if file exists
  try {
    await gfs.files
      .find({ filename: req.params.filename })
      .toArray((err, files) => {
        if (!files || files.length === 0) {
          return res.status(404).json({
            status: 404,
            msg: "No file founded"
          });
        }
        // create read stream
        let readstream = gfs.createReadStream({
          filename: files[0].filename,
          root: "myImage"
        });
        // set the proper content type
        res.set("Content-Type", files[0].contentType);
        // Return response
        return readstream.pipe(res);
      });
  } catch (err) {
    console.error(er.message);
    res.status(500).send("Server Error");
  }
});

// @route DELETE file/:filename
// @desc  delete an image
// access PRIVATE
router.delete("/:filename", auth, async (req, res) => {
  try {
    await gfs.remove(
      { filename: req.params.filename, root: "myImage" },
      function(err) {
        if (err)
          return res.status(404).json({ status: 404, msg: "Image not found" });
      }
    );
    await Image.findOneAndRemove({ imageName: req.params.filename });
    res.json({ status: 200, msg: "Image removed" });
  } catch (err) {
    console.error(er.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
