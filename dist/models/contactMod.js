"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var contactCollection = _mongoose["default"].model('contacts', new _mongoose["default"].Schema({
  Name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  comment: {
    type: String,
    minlength: 5,
    maxlength: 10000,
    required: true
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

var _default = contactCollection;
exports["default"] = _default;