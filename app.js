const express = require("express");
const app = express();

//rest of the packages
const morgan = require("morgan");

//middleware
app.use(morgan("tiny"));

app.get("/", (req, res) => {
  res.send("Welcome to Food Delivery Application");
});

const port = process.env.PORT || 5000;
app.listen(port, console.log(`Server is listening on port: ${port}`));
