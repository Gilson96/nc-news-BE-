const db = require("../db/connection");

exports.topics = () => {
  return db
    .query("SELECT topics.slug, topics.description FROM topics;")
    .then(({ rows }) => {
      return rows;
    });
};
