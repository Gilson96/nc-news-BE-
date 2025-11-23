const db = require("../db/connection");

exports.find = () => {
  return db
    .query("SELECT users.username, users.name, users.avatar_url FROM users;")
    .then(({ rows }) => {
      return rows;
    });
};

