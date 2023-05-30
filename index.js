const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const { validateData, createUser } = require("./dto/user.dto");
const { login } = require("./controller/auth");

var corsOptions = {
  origin: [
    "https://assignment-one-taupe.vercel.app",
    "https://assignment-one-abuhuraira24.vercel.app",
    "http://localhost:3000",
  ],
  methods: [" GET", "POST", " PUT", "PATCH", " DELETE"],
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

require("dotenv").config();

// Use body-parser middleware
app.use(bodyParser.json());

// Define a route
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/account", require("./routes/index"));

// Start the server
app.listen(process.env.port || 5000, () => {
  mongoose
    .connect(process.env.db_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
    })
    .then(() => {
      console.log("Database connected successfully!");
    })
    .catch((err) => {
      console.error("Error connecting to the database", err);
      process.exit(1); // Exit the application if database connection fails
    });
});
