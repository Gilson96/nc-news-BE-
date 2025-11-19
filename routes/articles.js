const {
  getAllArticles,
  getArticleById,
  editArticle,
  createComment,
  deleteArticle,
} = require("../controllers/articles");
const { getCommentsByArticleId } = require("../controllers/comments");
const articlesRouter = require("express").Router();

articlesRouter.get("/", getAllArticles);

articlesRouter.get("/:article_id", getArticleById);

articlesRouter.get("/:article_id/comments", getCommentsByArticleId);

articlesRouter.patch("/:article_id", editArticle);

articlesRouter.delete("/:article_id", deleteArticle);

articlesRouter.post("/:article_id/comments", createComment);

module.exports = articlesRouter;
