"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _dotenv = _interopRequireDefault(require("dotenv"));

_dotenv["default"].config();

var secret = process.env.SECRET_KEY;

exports.generalToken = function (user) {
  var firstName = user.firstName,
      lastName = user.lastName,
      email = user.email;
  return _jsonwebtoken["default"].sign({
    firstName: firstName,
    lastName: lastName,
    email: email
  }, secret, {
    expiresIn: '900s'
  });
};

exports.decrypToken = function (Token) {
  return _jsonwebtoken["default"].verify(Token, secret, function (error, userInfo) {
    if (error) console.log(error.message);
    return userInfo;
  });
};