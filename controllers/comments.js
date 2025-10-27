const { commentsById, commentsByArticleId } = require("../models/comments");

exports.getCommentsByArticleId = (req, res) => {
  const article_id = req.params.article_id;
  const convertedArticle_idToNumber = Number(article_id);

  if (isNaN(convertedArticle_idToNumber)) {
    return res.status(400).send({ msg: "Bad request" });
  }

  return commentsByArticleId(article_id).then((comment) => {
    if (comment.length === 0) {
      return res
        .status(404)
        .send({ msg: `No results for comments in comment ${article_id}` });
    } else {
      return res.status(200).send(comment);
    }
  });
};

exports.deleteComment = (req, res) => {
  const comment_id = req.params.comment_id;
  const convertedComment_idToNumber = Number(comment_id);

  
  if (isNaN(convertedComment_idToNumber)) {
    return res.status(400).send({ msg: "Bad request" });
  }

  return commentsById(comment_id).then((comment) => {
    if (comment.length === 0) {
      return res
        .status(404)
        .send({ msg: `No results for comments in comment ${comment_id}` });
    } else {
      return res.status(204).send(comment);
    }
  });
};
