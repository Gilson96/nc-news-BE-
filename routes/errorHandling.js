const {
  handlePsqlError,
  handleCustomError,
  handleSeverError,
} = require("../controllers/erros.controllers");

const errorHandling = require("express").Router();

errorHandling.use(handlePsqlError);
errorHandling.use(handleCustomError);
errorHandling.use(handleSeverError);

module.exports = errorHandling;
