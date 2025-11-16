const db = require("../db/connection");

exports.users = () => {
  return db
    .query("SELECT users.username, users.name, users.avatar_url FROM users;")
    .then(({ rows }) => {
      return rows;
    });
};

exports.create = (title, topic, author) => {
  return db
    .query(
      `INSERT INTO articles (title, topic, author) VALUES ($1, $2, $3) RETURNING *;`,
      [title, topic, author]
    )
    .then(({ rows }) => {
      return rows;
    });
};
