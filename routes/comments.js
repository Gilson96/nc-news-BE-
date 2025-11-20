const { deleteComment, updateComment } = require("../controllers/comments");
const commentsRouter = require("express").Router();

commentsRouter.patch("/:comment_id", updateComment);
commentsRouter.delete("/:comment_id", deleteComment);

module.exports = commentsRouter;
