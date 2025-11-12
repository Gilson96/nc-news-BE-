const jwt = require("jsonwebtoken");
const { create } = require("../models/authentication");

exports.signIn = (req, res) => {
  const { username } = req.body;
  const { password } = req.body;
  const { name } = req.body;
  const { avatar_url } = req.body;

  let jwtSecretKey = process.env.JWT_SECRET_KEY;
  let data = {
    time: Date(),
    username,
    password,
  };

  const token = jwt.sign(data, jwtSecretKey);

  return create(username, password, name, avatar_url).then(() => {
    return res.status(201).send({
      user: {
        username,
        token,
        name,
        avatar_url,
      },
    });
  });
};

exports.login = (req, res) => {
    
  let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
  let jwtSecretKey = process.env.JWT_SECRET_KEY;

  try {
    const token = req.header(tokenHeaderKey);

    const verified = jwt.verify(token, jwtSecretKey);
    if (verified) {
      return res.send("Successfully Verified");
    } else {
      // Access Denied
      return res.status(401).send(error);
    }
  } catch (error) {
    // Access Denied
    return res.status(401).send(error);
  }
};
