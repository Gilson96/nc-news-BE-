const db = require("../db/connection");

exports.commentsByArticleId = (article_id) => {
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

exports.deleteCommentsById = (comment_id) => {
  return db
    .query(`DELETE FROM comments WHERE comment_id = $1 RETURNING *;`, [
      comment_id,
    ])
    .then(({ rows }) => {
      return rows;
    });
};
