const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Grid = require("gridfs-stream");
const conn = mongoose.connection;
const Image = require("../models/ImageUpload");
let gfs;

conn.once("open", function() {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("myImage");
});

router.get("/:filename", (req, res) => {
  //   gfs.collection("fs.files"); //set collection name to lookup into
  /** First check if file exists */
  gfs.files
    .find({ filename: req.params.filename })
    .toArray(function(err, files) {
      if (!files || files.length === 0) {
        return res.status(404).json({
          responseCode: 1,
          responseMessage: "error"
        });
      }
      // create read stream
      var readstream = gfs.createReadStream({
        filename: files[0].filename,
        root: "myImage"
      });
      // set the proper content type
      res.set("Content-Type", files[0].contentType);
      // Return response
      return readstream.pipe(res);
    });
});

router.delete("/:filename", async (req, res) => {
  //   gfs.collection("fs.files"); //set collection name to lookup into
  /** First check if file exists */
  try {
    await gfs.remove(
      { filename: req.params.filename, root: "myImage" },
      function(err) {
        if (err) return res.status(404).json({ msg: "event not found" });
      }
    );
    await Image.findOneAndRemove({ imageName: req.params.filename });
    res.json({ msg: "Image removed" });
  } catch (err) {
    console.error(er.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
