const { users } = require("../models/users");



exports.getAllUsers = (req, res) => {
  return users().then((users) => {
    res.status(200).send(users);
  });
};
