"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateblog = void 0;

var validateblog = function validateblog(req, res, next) {
  var blog = req.body;
  if (!blog.bTitle) res.status(400).json({
    message: "please include the blog title "
  });else if (!blog.bContent) res.status(400).json({
    message: "please provide the message body"
  });else if (!blog.bPublisher) res.status(400).json({
    message: "please include the blog publisher"
  });else next();
};

exports.validateblog = validateblog;