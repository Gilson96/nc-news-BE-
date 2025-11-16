const { getAllTopics } = require("../controllers/topics");

const topicsRouter = require("express").Router();

topicsRouter.get("/", getAllTopics);

module.exports = topicsRouter;
