const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (token) {
    const decode = jwt.verify(token, "masai");
    console.log(decode);
    if (decode) {
      req.body.userID = decode.userID;
      next();
    } else {
      res.status(400).send({ msg: "Please Login First" });
    }
  } else {
    res.status(400).send({ msg: "Please Login First" });
  }
};

module.exports = { auth };
