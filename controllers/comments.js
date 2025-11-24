const { checkIfExists } = require("../models/checkIfExists");
const { update, findById, deleteId } = require("../models/comments");

exports.getCommentsByArticleId = (req, res) => {
  const article_id = req.params.article_id;

  if (article_id === undefined) {
    return res.status(400).send({ msg: "Invalid id" });
  }

  return findById(article_id).then((comment) => {
    if (comment.length === 0) {
      return res.status(404).send({ msg: `Comments not found` });
    } else {
      return res.status(200).send(comment);
    }
  });
};

exports.updateComment = (req, res) => {
  const comment_id = req.params.comment_id;
  const { body } = req.body;
  const { votes } = req.body;

  if (comment_id === undefined) {
    return res.status(400).send({ msg: "Invalid id" });
  }

  return checkIfExists("comments", "comment_id", comment_id).then((result) => {
    if (!result) {
      return res.status(404).send({ msg: "Comments not found" });
    } else {
      return update(body, votes, comment_id).then((comment) => {
        return res.status(201).send({ comment: comment[0] });
      });
    }
  });
};

exports.deleteComment = (req, res) => {
  const comment_id = req.params.comment_id;

  if (comment_id === undefined) {
    return res.status(400).send({ msg: "Invalid id" });
  }

  return checkIfExists("comments", "comment_id", comment_id).then((result) => {
    if (!result) {
      return res.status(404).send({ msg: "Comments not found" });
    } else {
      return deleteId(comment_id).then((comment) => {
        return res.status(204).send({ comment: comment[0] });
      });
    }
  });
};
