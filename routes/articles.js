const {
  getAllArticles,
  getArticleById,
  editArticle,
  createComment,
} = require("../controllers/articles");
const { getCommentsByArticleId } = require("../controllers/comments");
const articlesRouter = require("express").Router();

articlesRouter.get("/", getAllArticles);

articlesRouter.get("/:article_id", getArticleById);

articlesRouter.get("/:article_id/comments", getCommentsByArticleId);

articlesRouter.post("/:article_id/comments", createComment);

articlesRouter.patch("/:article_id", editArticle);

module.exports = articlesRouter;
