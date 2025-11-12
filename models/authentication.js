const db = require("../db/connection");

exports.create = (username, password, name, avatar_url) => {
  return db
    .query(
      `INSERT INTO users (username, password, name, avatar_url) VALUES($1, $2, $3, $4) RETURNING *;`,
      [username, password, name, avatar_url]
    )
    .then(({ rows }) => {
      return rows;
    });
};

exports.find = (username, password) => {
    return db.query('SELECT * FROM users WHERE')
};
