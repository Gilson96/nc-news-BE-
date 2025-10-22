const express = require("express");
const app = express();
const db = require("./db/connection");

app.get("/api/topics", (req, res) => {
  return db
    .query("SELECT * FROM topics;")
    .then(({ rows }) => {
      return res.status(200).send(rows);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.listen(9090, () => {
  console.log("Server is listening on port 9090...");
});

module.exports = app;
