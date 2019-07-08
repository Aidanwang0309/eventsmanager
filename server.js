const express = require("express");
const app = express();

const connectDB = require("./config/db");
connectDB();

const PORT = process.env.port || 5000;

app.use(express.json({ extended: false }));

// app.get("/", (req, res) =>
//   res.json({ msg: "Welcome to the contact keeper api" })
// );

// Define Routes
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/events", require("./routes/events"));

app.listen(PORT, () => console.log(`LISTENING TO PORT ${PORT}`));
