const { checkIfExists } = require("../models/checkIfExists");
const { topics, create } = require("../models/topics");

exports.getAllTopics = (req, res) => {
  return topics().then((topics) => {
    res.status(200).send(topics);
  });
};

exports.createTopics = (req, res) => {
  const { slug } = req.body;

  if (slug === undefined) {
    return res.status(400).send({ msg: "Invalid field" });
  }

  if (typeof slug !== "string") {
    return res.status(400).send({ msg: "Invalid value" });
  }

  return checkIfExists("topics", "slug", slug).then((response) => {
    if (response) {
      return res.status(400).send({ msg: "This topic already exists" });
    } else {
      return create(slug).then((topic) => {
        return res.status(201).send({ topic: topic[0] });
      });
    }
  });
};
