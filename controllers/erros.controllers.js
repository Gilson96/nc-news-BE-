exports.handlePsqlError = (err, req, res, next) => {
  if (err.code === "22P02") {
   res.status(400).send({ msg: "Bad request" });
  } else {
    next(err);
  }
};

exports.handleCustomError = (err, req, res, next) => {
  if (err.status && err.msg) {
    return res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
};

exports.handleSeverError = (err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: "Somenthing went wrong!" });
};
