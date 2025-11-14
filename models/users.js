const db = require("../db/connection");

exports.users = () => {
  return db
    .query("SELECT users.username, users.name, users.avatar_url FROM users;")
    .then(({ rows }) => {
      return rows;
    });
};

exports.create = (title, topic, author, article_img_url) => {
  return db
    .query(
      `INSERT INTO articles (title, topic, author, article_img_url) VALUES ($1, $2, $3, $4) RETURNING *;`,
      [title, topic, author, article_img_url]
    )
    .then(({ rows }) => {
      return rows;
    });
};
