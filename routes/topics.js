const {
  getAllTopics,
  createTopics,
  deleteTopics,
} = require("../controllers/topics");

const topicsRouter = require("express").Router();

topicsRouter.get("/", getAllTopics);
topicsRouter.post("/", createTopics);
topicsRouter.delete("/:slug", deleteTopics);

module.exports = topicsRouter;
