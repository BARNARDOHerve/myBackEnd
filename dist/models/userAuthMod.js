"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var User = _mongoose["default"].model('User', new _mongoose["default"].Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    minlength: 6,
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

var _default = User;
exports["default"] = _default;