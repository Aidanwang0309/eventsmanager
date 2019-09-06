const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Grid = require("gridfs-stream");
const conn = mongoose.connection;
let gfs;

conn.once("open", function() {
  gfs = Grid(conn.db, mongoose.mongo);
  //   console.log(gfs);
});

router.get("/:filename", (req, res) => {
  //   gfs.collection("fs.files"); //set collection name to lookup into
  /** First check if file exists */
  gfs.files
    .find({ filename: req.params.filename })
    .toArray(function(err, files) {
      if (!files || files.length === 0) {
        console.log(files.length);
        return res.status(404).json({
          responseCode: 1,
          responseMessage: "error"
        });
      }
      // create read stream
      var readstream = gfs.createReadStream({
        filename: files[0].filename
      });
      // set the proper content type
      res.set("Content-Type", files[0].contentType);
      // Return response
      return readstream.pipe(res);
    });
});

module.exports = router;
