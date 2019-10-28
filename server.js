const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
connectDB();
const app = express();
app.use(cors());
app.use(express.json({ extended: false }));

// Define Routes
app.use("/api/users", require("./routes/users"));
app.use("/api/events", require("./routes/events"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/img/upload", require("./routes/imgUpload"));
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
