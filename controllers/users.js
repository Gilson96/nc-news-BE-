const { create } = require("../models/articles");
const { find } = require("../models/users");

exports.getAllUsers = (req, res) => {
  return find().then((users) => {
    res.status(200).send(users);
  });
};

exports.createArticle = (req, res) => {
  const { title } = req.body;
  const { topic } = req.body;
  const { author } = req.body;

  const fields = Object.keys(req.body);

  const requiredFields = ["title", "topic", "author"];

  for (let i = 0; i < requiredFields.length; i++) {
    if (requiredFields[i] !== fields[i])
      return res.status(400).send({ msg: "Invalid field" });
  }

  if (
    typeof title !== "string" ||
    typeof topic !== "string" ||
    typeof author !== "string"
  ) {
    return res.status(400).send({ msg: "Bad request" });
  }

  return create(title, topic, author).then((article) => {
    return res.status(201).send({ article: article[0] });
  });
};
