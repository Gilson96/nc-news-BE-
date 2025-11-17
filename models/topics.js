const db = require("../db/connection");

exports.topics = () => {
  return db
    .query("SELECT topics.slug, topics.description FROM topics;")
    .then(({ rows }) => {
      return rows;
    });
};

exports.create = (slug) => {
  return db
    .query("INSERT INTO topics (slug) VALUES ($1) RETURNING*;", [slug])
    .then(({ rows }) => {
      return rows;
    });
};
