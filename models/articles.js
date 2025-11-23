const db = require("../db/connection");
const format = require("pg-format");

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

exports.find = (sort_by = "created_at", order = "DESC", topic) => {
  const articlesFormat = format(
    `SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url, COUNT(comment_id) FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id ${
      topic !== undefined ? `WHERE topic ILIKE '%${topic}%'` : ""
    }  GROUP BY articles.article_id ORDER BY ${sort_by} ${order};`
  );
  return db.query(articlesFormat).then(({ rows }) => {
    return rows;
  });
};

exports.findId = (article_id) => {
  return db
    .query(
      "SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url, COUNT(comment_id) FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id WHERE articles.article_id = $1 GROUP BY articles.article_id;",
      [article_id]
    )
    .then(({ rows }) => {
      return rows;
    });
};

exports.update = (title, votes, article_id) => {
  return db
    .query(
      `UPDATE articles
      SET title = COALESCE($1, title),
      votes = COALESCE($2, votes)
      WHERE article_id = $3 RETURNING *;`,
      [title, votes, article_id]
    )
    .then(({ rows }) => {
      return rows;
    });
};

exports.deleteId = (article_id) => {
  return db
    .query(`DELETE FROM articles WHERE article_id = $1 RETURNING *;`, [
      article_id,
    ])
    .then(({ rows }) => {
      return rows;
    });
};
