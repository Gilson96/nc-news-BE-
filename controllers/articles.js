const {
  articles,
  articlesById,
  articleEdit,
  articleAdd,
} = require("../models/articles");

exports.getAllArticles = (req, res) => {
  const { sort_by } = req.query;
  const { order } = req.query;
  const { topic } = req.query;

  console.log(req.query);

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
  const { votes } = req.body;

  return articleEdit(article_id, votes).then((article) => {
    if (article.length === 0) {
      return res.status(404).send({ msg: `No results ` });
    } else {
      console.log(article);
      return res.status(201).send({ article: article[0] });
    }
  });
};

exports.addArticles = (req, res) => {
  const { body } = req.body;
  const { username } = req.body;

  if (body === undefined || username === undefined) {
    return res.status(400).send({ msg: `Bad request` });
  }

  if (typeof body !== "string" || typeof username !== "string") {
    return res.status(400).send({ msg: `Bad request` });
  }

  return articleAdd(body, username).then((article) => {
    return res.status(201).send({ article: article[0] });
  });
};
