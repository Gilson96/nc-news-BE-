const db = require("../db/connection");
const format = require("pg-format");

exports.articles = (sort_by, order, topic) => {
  const articlesFormat = format(
    `SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url, COUNT(comment_id) FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id ${
      topic !== undefined ? `WHERE topic ILIKE '%${topic}%'` : ""
    }  GROUP BY articles.article_id ORDER BY ${sort_by} ${order};`
  );
  return db.query(articlesFormat).then(({ rows }) => {
    return rows;
  });
};

exports.articlesById = (article_id) => {
  return db
    .query( 
      "SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url, COUNT(comment_id) FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id WHERE articles.article_id = $1 GROUP BY articles.article_id;",
      [article_id]
    )
    .then(({ rows }) => {
      return rows;
    });
};

exports.articleEdit = (article_id, inc_votes) => {
  return db
    .query(
      "UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING *;",
      [inc_votes, article_id]
    )
    .then(({ rows }) => {
      return rows;
    });
};

exports.articleAdd = (body, username) => {
  return db
    .query(`INSERT INTO articles (body, author) VALUES($1, $2) RETURNING *;`, [
      body,
      username,
    ])
    .then(({ rows }) => {
      return rows;
    });
};
