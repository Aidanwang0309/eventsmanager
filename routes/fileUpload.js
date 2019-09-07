const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();
const Image = require("../models/ImageUpload");
require("dotenv").config();
const GridFsStorage = require("multer-gridfs-storage");

// const dirPath = path.join(__dirname, "..", "public/upload");
// const fs = require("fs");
// const mongoose = require("mongoose");
// const Grid = require("gridfs-stream");
// const conn = mongoose.connection;
// let gfs;

// conn.once("open", function() {
//   gfs = Grid(conn.db, mongoose.mongo);
//   //   console.log(gfs);
// });

// mongoose.connect(
//   `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@eventskeeper-wx6bb.mongodb.net/test?retryWrites=true&w=majority`
// );

// const storage = multer.diskStorage({
//   destination: function(req, file, cb) {
//     if (!fs.existsSync(dirPath)) {
//       fs.mkdir(dirPath, function(err) {
//         if (err) {
//           console.log(err);
//         } else {
//           cb(null, dirPath);
//         }
//       });
//     } else {
//       cb(null, dirPath);
//     }
//   },
//   filename: function(req, file, cb) {
//     // console.log('filename()', file)
//     var ext = path.extname(file.originalname);
//     cb(null, file.fieldname + "-" + Date.now() + ext);
//   }
// });

const storage = new GridFsStorage({
  url: `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@eventskeeper-wx6bb.mongodb.net/test?retryWrites=true&w=majority`,

  file: (req, file) => {
    return new Promise((resolve, reject) => {
      const filename =
        file.fieldname + "-" + Date.now() + path.extname(file.originalname);
      const fileInfo = {
        filename: filename,
        bucketName: "myImage"
      };
      resolve(fileInfo);
    });
  }

  // filename: (req, file, cb) => {
  //   let ext = path.extname(file.originalname);
  //   cb(null, file.fieldname + "-" + Date.now() + ext);
  // },
  // root: "myFiles"
});

const upload = multer({ storage });
const uploadSingle = upload.single("image");

router.post("/", uploadSingle, async (req, res) => {
  try {
    const newImage = new Image({
      imageName: req.file.filename,
      imageData: req.file.id
    });

    const result = await newImage.save();
    res.status(200).json({
      success: true,
      document: result
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
