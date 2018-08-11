const express = require("express");
const mongoose = require("mongoose");

const app = express();

// configure database
const db = require("./config/keys").mongoURI;

// connect to database
// Then returns promise
mongoose
  .connect(db)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch(err => {
    console.log("Error occured.\n" + err);
  });

app.get("/", (req, res) => res.send("app.get is working"));
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running at port no ${port}`));
