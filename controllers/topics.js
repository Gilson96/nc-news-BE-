const { topics } = require("../models/topics");

exports.getAllTopics = (req, res) => {
  return topics().then((topics) => {
    res.status(200).send(topics);
  });
};
