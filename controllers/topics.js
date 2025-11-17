const { topics, create } = require("../models/topics");

exports.getAllTopics = (req, res) => {
  return topics().then((topics) => {
    res.status(200).send(topics);
  });
};

exports.createTopics = (req, res) => {
  const { slug } = req.body;
  const { description } = req.body;

  if (slug === undefined || description === undefined) {
    return res.status(400).send({ msg: "Invalid field" });
  }

  if (typeof slug !== "string" || typeof description !== "string") {
    return res.status(400).send({ msg: "Invalid value" });
  }
  return create(slug, description).then((topic) => {
    return res.status(201).send({ topic: topic[0] });
  });
};
