const { checkIfExists } = require("../models/checkIfExists");
const {
  commentsByArticleId,
  deleteCommentsById,
  create,
  update,
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

exports.updateComment = (req, res) => {
  const comment_id = req.params.comment_id;
  const { body } = req.body;
  const { votes } = req.body;

  return checkIfExists("comments", "comment_id", comment_id).then((result) => {
    if (!result) {
      return res.status(404).send({ msg: "Comment do not exists!" });
    } else {
      return update(body, votes, comment_id).then((comment) => {
        return res.status(201).send({ comment: comment[0] });
      });
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
