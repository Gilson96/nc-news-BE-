const { errorMonitor } = require("supertest/lib/test");

exports.handlePsqlError = (err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ msg: "bad request" });
  } else {
    next(err);
  }
};

exports.handleCustomError = (err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
};

exports.handleSeverError = (err, req, res, next) => {
  res.status(500).send({ msg: "Somenthing went wrong!" });
};
