const express = require("express");
const app = express();
const db = require("./db/connection");

app.get("/api/topics", (req, res) => {
  return db.query("SELECT * FROM topics;").then(({ rows }) => {
    return res.status(200).send(rows);
  });
});

app.get("/api/articles/:article_id", (req, res) => {
  const article_id = req.params.article_id;

  return db
    .query("SELECT * FROM articles WHERE article_id = $1;", [article_id])
    .then(({ rows }) => {
      console.log(rows);
      return res.status(200).send({ article: rows[0] });
    });
});

app.listen(9090, () => {
  console.log("Server is listening on port 9090...");
});

module.exports = app;
