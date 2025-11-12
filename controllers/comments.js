const {
  commentsByArticleId,
  deleteCommentsById,
  create,
} = require("../models/comments");

exports.getCommentsByArticleId = (req, res) => {
  const article_id = req.params.article_id;

  return commentsByArticleId(article_id).then((comment) => {
    if (comment.length === 0) {
      return res.status(404).send({ msg: `No results` });
    } else {
      return res.status(200).send(comment);
    }
  });
};

exports.deleteComment = (req, res) => {
  const comment_id = req.params.comment_id;

  return deleteCommentsById(comment_id).then((comment) => {
    if (comment.length === 0) {
      return res.status(404).send({ msg: `Not Found` });
    } else {
      return res.status(204).send(comment);
    }
  });
};
