require("dotenv").config();
require("express-async-errors");

//express
const express = require("express");
const app = express();

//rest of the packages
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

//routers
const authRouter = require("./routes/authRoutes");

//database
const connectDB = require("./db/connect");

//middleware
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.use(morgan("tiny"));
app.use(cookieParser(process.env.JWT_SECRET));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to Food Delivery Application");
});

app.use("/api/v1/auth", authRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;
const start = async () => {
  await connectDB(process.env.MONGO_URL);
  console.log("Connected to the database successfuly");
  app.listen(port, console.log(`Server is listening on port: ${port}`));
};

start();
