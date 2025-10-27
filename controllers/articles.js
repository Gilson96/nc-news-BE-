const {
  articles,
  articlesById,
  articleEdit,
  articleAdd,
} = require("../models/articles");

exports.getAllArticles = (req, res) => {
  const { sort_by } = req.body;
  const { order } = req.body;
  const { topic } = req.query;

  return articles(sort_by, order, topic).then((articles) => {
    return res.status(200).send(articles);
  });
};

exports.getArticleById = (req, res) => {
  const article_id = req.params.article_id;
 
  return articlesById(article_id).then((article) => {
    if (article.length === 0) {
      return res
        .status(404)
        .send({ msg: `No results for article ${article_id}` });
    } else {
      return res.status(200).send({ article: article[0] });
    }
  });
};

exports.editArticle = (req, res) => {
  const article_id = req.params.article_id;
  const { inc_votes } = req.body.newVotes;

  return articleEdit(article_id, inc_votes).then((article) => {
    if (article.length === 0) {
      return res
        .status(404)
        .send({ msg: `No results for article ${article_id}` });
    } else {
      return res.status(201).send({ article: article[0] });
    }
  });
};

exports.addArticles = (req, res) => {
  const article_id = req.params.article_id;
  const { body } = req.body;
  const { username } = req.body;

  return articleAdd(body, username).then((article) => {
    if (article.length === 0) {
      return res
        .status(404)
        .send({ msg: `No results for article ${article_id}` });
    } else {
      return res.status(201).send({ article: article[0] });
    }
  });
};
