const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(2400, () => {
  console.log(2400);
});
