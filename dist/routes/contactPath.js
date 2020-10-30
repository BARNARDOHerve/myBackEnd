"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _contactContr = require("../controller/contactContr");

var contactRoute = _express["default"].Router();

contactRoute.post('/Comments/Create', _contactContr.createComment);
contactRoute.get('/Comments', _contactContr.allComments);
contactRoute.get('/Commments/comment/:id', _contactContr.singleComment);
contactRoute["delete"]('/Comments/Delete/:id', _contactContr.deleteComment);
var _default = contactRoute;
exports["default"] = _default;