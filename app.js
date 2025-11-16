const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

const apiRouter = require("express").Router();

const usersRouter = require("./routes/users");
const topicsRouter = require("./routes/topics");
const commentsRouter = require("./routes/comments");
const articlesRouter = require("./routes/articles");
const {
  handlePsqlError,
  handleCustomError,
  handleSeverError,
} = require("./controllers/erros.controllers");

app.use("/api", apiRouter);
apiRouter.use("/users", usersRouter);
apiRouter.use("/topics", topicsRouter);
apiRouter.use("/comments", commentsRouter);
apiRouter.use("/articles", articlesRouter);

app.use(handlePsqlError);
app.use(handleCustomError);
app.use(handleSeverError);

module.exports = app;
