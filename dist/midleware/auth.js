"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.auth = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _dotenv = _interopRequireDefault(require("dotenv"));

_dotenv["default"].config();

var secret = process.env.SECRET_KEY;

var auth = function auth(req, res, next) {
  var authorization = req.headers.authorization;
  var token = authorization && authorization.split(' ')[1];

  if (!token) {
    res.status(403).json({
      message: "please login"
    });
  }

  _jsonwebtoken["default"].verify(token, secret, function (err, user) {
    if (err) res.status(401).json({
      message: "please login again"
    });
    req.user = user;
    next();
  });
}; // module.exports = auth;


exports.auth = auth;