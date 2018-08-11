const express = require("express");
const app = express();
app.get("/", (req, res) => res.send("app.get is working"));
const port = process.env.PORT || 5000;

app.listen(port, () => console.log("Server is running at port no `{$port}`"));
