const {
  articles,
  articlesById,
  articleEdit,
  comment,
  deleteId,
  update,
} = require("../models/articles");
const { checkIfExists } = require("../models/checkIfExists");

exports.getAllArticles = (req, res) => {
  const { sort_by } = req.query;
  const { order } = req.query;
  const { topic } = req.query;

  return articles(sort_by, order, topic).then((articles) => {
    return res.status(200).send(articles);
  });
};

exports.getArticleById = (req, res) => {
  const article_id = req.params.article_id;

  return articlesById(article_id).then((article) => {
    if (article.length === 0) {
      return res.status(404).send({ msg: `No results` });
    } else {
      return res.status(200).send({ article: article[0] });
    }
  });
};

exports.editArticle = (req, res) => {
  const article_id = req.params.article_id;
  const { title } = req.body;
  const { votes } = req.body;

  return checkIfExists("articles", "article_id", article_id).then((result) => {
    if (!result) {
      return res.status(404).send({ msg: "Somenthing went wrong!" });
    } else {
      return update(title, votes, article_id).then((article) => {
        return res.status(201).send({ article: article[0] });
      });
    }
  });
};

exports.deleteArticle = (req, res) => {
  const article_id = req.params.article_id;
  const convertedArticle_id = Number(article_id);

  if (article_id === undefined) {
    return res.status(400).send({ msg: "Invalid id" });
  }

  if (typeof convertedArticle_id !== "number") {
    return res.status(400).send({ msg: "Bad request" });
  }

  return checkIfExists("articles", "article_id", article_id).then(
    (response) => {
      if (!response) {
        return res.status(404).send({ msg: "Cannot find article" });
      } else {
        return deleteId(article_id).then(() => {
          return res.status(204).send();
        });
      }
    }
  );
};

exports.createComment = (req, res) => {
  const article_id = req.params.article_id;
  const { body } = req.body;
  const { username } = req.body;
  const convertedArticle_id = Number(article_id);

  if (body === undefined || username === undefined) {
    return res.status(400).send({ msg: `Bad request` });
  }

  if (typeof body !== "string" || typeof username !== "string") {
    return res.status(400).send({ msg: `Bad request` });
  }

  return comment(convertedArticle_id, body, username).then((article) => {
    return res.status(201).send({ article: article[0] });
  });
};
