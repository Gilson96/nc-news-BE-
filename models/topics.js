const db = require("../db/connection");

exports.topics = () => {
  return db
    .query("SELECT topics.slug, topics.description FROM topics;")
    .then(({ rows }) => {
      return rows;
    });
};

exports.create = (slug, description) => {
  return db
    .query(
      "INSERT INTO topics (slug, description) VALUES ($1,$2) RETURNING*;",
      [slug, description]
    )
    .then(({ rows }) => {
      return rows;
    });
};
