const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
// const connectDB = require("./config/db");
// connectDB();

require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@eventskeeper-wx6bb.mongodb.net/test?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true
        // useCreateIndex: true,
        // useFindAndModify: false
      }
    );

    console.log("MongoDB Connected...");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

connectDB();

app.use(express.json({ extended: false }));

// Define Routes
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/events", require("./routes/events"));
app.use("/api/fileUpload", require("./routes/fileUpload"));
app.use("/api/file", require("./routes/file"));

// Server config in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`LISTENING TO PORT ${PORT}`));
