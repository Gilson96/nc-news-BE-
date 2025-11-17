const { getAllTopics, createTopics } = require("../controllers/topics");

const topicsRouter = require("express").Router();

topicsRouter.get("/", getAllTopics);
topicsRouter.post("/", createTopics);

module.exports = topicsRouter;
