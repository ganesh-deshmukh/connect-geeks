const express = require("express");
const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
const bodyParser = require("body-parser");

const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");

const app = express();

// Body parser middleware to send input data to backend.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// configure database
const db = require("./config/keys").mongoURI;

// connect to database
//  if connected successfully  then returns promise by "then()"
// if error then catch error and do "anyFunction()" eg.output that error.

mongoose
  .connect(
    db,
    { useNewUrlParser: true } // added this flag to remove deprecation warning
  )
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch(err => {
    console.log("Error occured.\n" + err);
  });

app.get("/", (req, res) => res.send("app.get is working"));

// Use following routes from apis imported.
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running at port no ${port}`));
