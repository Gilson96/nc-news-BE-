const express = require("express");
const app = express();
const { getAllTopics } = require("./controllers/topics");
const { getAllUsers } = require("./controllers/users");
const {
  getAllArticles,
  getArticleById,
  editArticle,
  addArticles,
} = require("./controllers/articles");
const {
  getCommentsByArticleId,
  deleteComment,
} = require("./controllers/comments");
const {
  handlePsqlError,
  handleCustomError,
  handleSeverError,
} = require("./controllers/erros.controllers");

app.use(express.json());


app.use('/api', express.static('public'))
app.get("/api/topics", getAllTopics);

app.get("/api/users", getAllUsers);

app.get("/api/articles", getAllArticles);

app.get("/api/articles/:article_id", getArticleById);

app.get("/api/articles/:article_id/comments", getCommentsByArticleId);

app.post("/api/articles/:article_id/comments", addArticles);

app.patch("/api/articles/:article_id", editArticle);

app.delete("/api/comments/:comment_id", deleteComment);

app.use(handlePsqlError);
app.use(handleCustomError);
app.use(handleSeverError);

module.exports = app;
