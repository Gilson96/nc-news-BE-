const { getAllUsers, createArticle } = require("../controllers/users");

const usersRouter = require("express").Router();

usersRouter.get("/", getAllUsers);
usersRouter.post("/article", createArticle);

module.exports = usersRouter;
