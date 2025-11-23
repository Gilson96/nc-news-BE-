const db = require("../db/connection");

exports.create = (article_id, body, author) => {
  return db
    .query(
      `INSERT INTO comments (article_id, body, author) VALUES($1, $2, $3)  RETURNING *;`,
      [article_id, body, author]
    )
    .then(({ rows }) => {
      return rows;
    });
};

exports.findById = (article_id) => {
  return db
    .query(
      "SELECT * FROM comments WHERE article_id = $1 ORDER BY created_at DESC;",
      [article_id]
    )
    .then(({ rows }) => {
      return rows;
    });
};

exports.update = (body, votes, article_id) => {
  return db
    .query(
      `UPDATE comments
      SET body = COALESCE($1, body),
      votes = COALESCE($2, votes)
      WHERE comment_id = $3 RETURNING *;`,
      [body, votes, article_id]
    )
    .then(({ rows }) => {
      return rows;
    });
};

exports.deleteId = (comment_id) => {
  return db
    .query(`DELETE FROM comments WHERE comment_id = $1 RETURNING *;`, [
      comment_id,
    ])
    .then(({ rows }) => {
      return rows;
    });
};
