const db = require("../connection");
const format = require("pg-format");
const { convertTimestampToDate } = require("./utils");

const seed = ({ topicData, userData, articleData, commentData }) => {
  return db
    .query("DROP TABLE IF EXISTS comments;")
    .then(() => {
      return db.query("DROP TABLE IF EXISTS articles;").then(() => {
        return db.query("DROP TABLE IF EXISTS topics;").then(() => {
          return db.query("DROP TABLE IF EXISTS users;");
        });
      });
    })
    .then(() => {
      return db.query(`CREATE TABLE topics (
        slug VARCHAR(40) PRIMARY KEY,
        description VARCHAR(255),
        img_url VARCHAR(1000) 
        );`);
    })
    .then(() => {
      return db.query(`CREATE TABLE users(
        username VARCHAR(255) PRIMARY KEY,
        password VARCHAR(255),
        name VARCHAR(255),
        avatar_url VARCHAR(1000) 
        );`);
    })
    .then(() => {
      return db.query(`CREATE TABLE articles(
        article_id SERIAL PRIMARY KEY,
        title VARCHAR(255),
        topic VARCHAR(40) REFERENCES topics(slug) ON DELETE CASCADE,
        author VARCHAR(40) REFERENCES users(username) ON DELETE CASCADE,
        body TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        votes INT DEFAULT 0,
        article_img_url VARCHAR(1000)
        );`);
    })
    .then(() => {
      return db.query(`CREATE TABLE comments (
        comment_id SERIAL PRIMARY KEY,
        article_id INT REFERENCES articles(article_id) ON DELETE CASCADE,
        body TEXT,
        votes INT DEFAULT 0,
        author VARCHAR(40) REFERENCES users(username),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`);
    })
    .then(() => {
      const formatTopicsData = topicData.map((topic) => {
        return [topic.slug, topic.description, topic.img_url];
      });
      const insertIntoTopics = format(
        `INSERT INTO topics (slug, description, img_url) VALUES %L RETURNING *;`,
        formatTopicsData
      );

      return db.query(insertIntoTopics);
    })
    .then(() => {
      const formatUsersData = userData.map((user) => {
        return [user.username, user.password, user.name, user.avatar_url];
      });
      const insertIntoUsers = format(
        `INSERT INTO users 
        (username, password, name, avatar_url) VALUES %L RETURNING *;`,
        formatUsersData
      );
      return db.query(insertIntoUsers);
    })
    .then(() => {
      const formatArticlesData = articleData.map((article) => {
        const convertedTimeArticle = convertTimestampToDate(article);

        return [
          article.title,
          article.topic,
          article.author,
          article.body,
          convertedTimeArticle.created_at,
          article.votes,
          article.article_img_url,
        ];
      });
      const insertIntoArticles = format(
        `INSERT INTO articles
    (title, topic, author, body, created_at, votes, article_img_url)
  VALUES
    %L
  RETURNING *;`,
        formatArticlesData
      );
      return db.query(insertIntoArticles);
    })
    .then(({ rows }) => {
      let newArticleId = {};

      for (let i = 0; i < rows.length; i++) {
        newArticleId[rows[i].title] = rows[i].article_id;
      }

      const formatCommentsData = commentData.map((comment) => {
        const convertedTimeComment = convertTimestampToDate(comment);

        return [
          newArticleId[comment.article_title],
          comment.body,
          comment.votes,
          comment.author,
          convertedTimeComment.created_at,
        ];
      });

      const insertIntoComments = format(
        `INSERT INTO comments
        (article_id, body, votes, author, created_at)
      VALUES
        %L
      RETURNING *;`,
        formatCommentsData
      );
      return db.query(insertIntoComments);
    });
};
module.exports = seed;
