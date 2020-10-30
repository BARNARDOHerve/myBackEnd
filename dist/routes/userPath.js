"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _userAuthForms = require("../controller/userAuthForms");

var userRouter = _express["default"].Router();

userRouter.post('/users/signup', _userAuthForms.user_signup);
userRouter.post('/users/login', _userAuthForms.user_login);
userRouter.get('/users', _userAuthForms.all_users);
userRouter.get('/users/user/:id', _userAuthForms.single_user);
userRouter.put('/users/Update/:id', _userAuthForms.update_user);
userRouter["delete"]('/users/Delete/:id', _userAuthForms.delete_user);
var _default = userRouter;
exports["default"] = _default;