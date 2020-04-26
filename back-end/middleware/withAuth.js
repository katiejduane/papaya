const config = require("../config");
const jwt = require("jsonwebtoken");

const withAuth = function (req, res, next) {
  const token =
    req.body.token ||
    req.query.token ||
    req.headers["authorization"] ||
    req.cookies.token;
  if (!token) {
    // console.log(req.url, req.params, req.body);
    res.status(401).json({ Unauthorized: "No token provided" });
  } else {
    // console.log("middleware, token: ", req.url, token, config.secret);
    jwt.verify(token, config.secret, function (err, user) {
      if (err) {
        console.log("err", err);
        res.status(403).json({ Unauthorized: "Invalid token" });
      } else {
        req.user = user;
        next();
      }
    });
  }
};

module.exports = withAuth;
