require("dotenv").config();
require("express-async-errors");

//express
const express = require("express");
const app = express();

//rest of the packages
const morgan = require("morgan");

//routers

//database
const connectDB = require("./db/connect");

//middleware
app.use(morgan("tiny"));

app.get("/", (req, res) => {
  res.send("Welcome to Food Delivery Application");
});

const port = process.env.PORT || 5000;
const start = async () => {
  await connectDB(process.env.MONGO_URL);
  console.log("Connected to the database successfuly");
  app.listen(port, console.log(`Server is listening on port: ${port}`));
};

start();
