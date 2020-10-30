"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var blogCollection = _mongoose["default"].model('Blogs', new _mongoose["default"].Schema({
  bTitle: {
    type: String,
    required: true
  },
  bContent: {
    type: String,
    required: true
  },
  bPublisher: {
    type: String,
    required: true
  },
  bPublishedDate: {
    type: Date,
    "default": new Date()
  },
  bPhoto: {
    type: String,
    required: false
  },
  createAt: {
    type: Date,
    "default": new Date()
  },
  modified: {
    type: Date,
    "default": new Date()
  }
}));

var _default = blogCollection;
exports["default"] = _default;