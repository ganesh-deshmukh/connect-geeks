const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const path = require("path");
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

// app.get("/", (req, res) => res.send("app.get is working"));
// Passport middleware after connect and before using routes
app.use(passport.initialize());

// Passport Config file call function and pass argument as function() passport
require("./config/passport")(passport);

// Use following routes from apis imported.
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

// server static assets if it is in production
if (process.env.NODE_ENV === "production") {
  // set static folder
  app.use(express.static("frontend/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running at port no ${port}`));
