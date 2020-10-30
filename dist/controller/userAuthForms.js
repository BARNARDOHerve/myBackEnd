"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.delete_user = exports.all_users = exports.single_user = exports.update_user = exports.user_login = exports.user_signup = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _userAuthMod = _interopRequireDefault(require("../models/userAuthMod"));

var _token = require("../helper/token");

var _hashpassword = _interopRequireDefault(require("../configuration/hashpassword"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var user_signup = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _req$body, firstName, lastName, email, password, checkUser, hPassword, newUser, savedUser;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _req$body = req.body, firstName = _req$body.firstName, lastName = _req$body.lastName, email = _req$body.email, password = _req$body.password;
            _context.next = 4;
            return _userAuthMod["default"].findOne({
              email: email
            });

          case 4:
            checkUser = _context.sent;

            if (!checkUser) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return", res.status(400).json({
              error: 'Email already exist!'
            }));

          case 7:
            _context.next = 9;
            return (0, _hashpassword["default"])(password);

          case 9:
            hPassword = _context.sent;
            newUser = new _userAuthMod["default"]({
              firstName: firstName,
              lastName: lastName,
              email: email,
              password: hPassword
            });
            _context.next = 13;
            return newUser.save();

          case 13:
            savedUser = _context.sent;
            return _context.abrupt("return", res.status(201).json({
              msg: 'Account created successfully',
              savedUser: savedUser
            }));

          case 17:
            _context.prev = 17;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", res.status(500).json({
              error: _context.t0.message
            }));

          case 20:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 17]]);
  }));

  return function user_signup(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.user_signup = user_signup;

var user_login = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var _req$body2, email, password, checkUser, validPassword, token;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
            _context2.next = 4;
            return _userAuthMod["default"].findOne({
              email: email
            });

          case 4:
            checkUser = _context2.sent;

            if (checkUser) {
              _context2.next = 7;
              break;
            }

            return _context2.abrupt("return", res.status(400).json({
              error: 'the account is invalid'
            }));

          case 7:
            _context2.next = 9;
            return _bcryptjs["default"].compare(password, checkUser.password);

          case 9:
            validPassword = _context2.sent;

            if (validPassword) {
              _context2.next = 12;
              break;
            }

            return _context2.abrupt("return", res.status(400).json({
              error: 'invalid password'
            }));

          case 12:
            _context2.next = 14;
            return (0, _token.generalToken)(checkUser);

          case 14:
            token = _context2.sent;
            console.log("checkuser", checkUser);
            return _context2.abrupt("return", res.status(200).json({
              msg: 'Account loged-in successfully',
              checkUser: checkUser,
              token: token
            }));

          case 19:
            _context2.prev = 19;
            _context2.t0 = _context2["catch"](0);
            return _context2.abrupt("return", res.status(500).json({
              error: _context2.t0.message
            }));

          case 22:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 19]]);
  }));

  return function user_login(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.user_login = user_login;

var update_user = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
    var user, updatedBlog;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return _userAuthMod["default"].findByIdAndUpdate({
              _id: req.params.id
            }, req.body);

          case 3:
            user = _context3.sent;
            _context3.next = 6;
            return _userAuthMod["default"].findOne({
              _id: req.params.id
            });

          case 6:
            updatedBlog = _context3.sent;
            res.status(200).send(updatedBlog);
            _context3.next = 13;
            break;

          case 10:
            _context3.prev = 10;
            _context3.t0 = _context3["catch"](0);
            res.status(400).json(_context3.t0);

          case 13:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 10]]);
  }));

  return function update_user(_x5, _x6, _x7) {
    return _ref3.apply(this, arguments);
  };
}();

exports.update_user = update_user;

var single_user = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var id;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            id = req.params.id;
            _context4.next = 4;
            return _userAuthMod["default"].findById(id).then(function (users) {
              res.statusCode = 200;
              res.setHeader('Content-Type', 'Application/json');
              res.json(users);
            });

          case 4:
            _context4.next = 9;
            break;

          case 6:
            _context4.prev = 6;
            _context4.t0 = _context4["catch"](0);
            throw new Error(_context4.t0);

          case 9:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 6]]);
  }));

  return function single_user(_x8, _x9) {
    return _ref4.apply(this, arguments);
  };
}();

exports.single_user = single_user;

var all_users = function all_users(req, res, next) {
  _userAuthMod["default"].find({}).then(function (users) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(users);
  }, function (err) {
    return next(err);
  })["catch"](function (err) {
    return next(err);
  });
};

exports.all_users = all_users;

var delete_user = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res, next) {
    var id, existuser, deleteUser;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            id = req.params.id;
            _context5.prev = 1;
            _context5.next = 4;
            return _userAuthMod["default"].find({
              _id: id
            });

          case 4:
            existuser = _context5.sent;

            if (!existuser.length) {
              _context5.next = 19;
              break;
            }

            _context5.prev = 6;
            _context5.next = 9;
            return _userAuthMod["default"].deleteOne({
              _id: id
            });

          case 9:
            deleteUser = _context5.sent;
            res.status(200).json({
              message: "comment deleted ".concat(existuser),
              deleteUser: deleteUser
            });
            _context5.next = 16;
            break;

          case 13:
            _context5.prev = 13;
            _context5.t0 = _context5["catch"](6);
            throw new Error(_context5.t0);

          case 16:
            ;
            _context5.next = 20;
            break;

          case 19:
            res.status(404).json({
              status: 403,
              error: 'user Id does not exist'
            });

          case 20:
            ;
            _context5.next = 27;
            break;

          case 23:
            _context5.prev = 23;
            _context5.t1 = _context5["catch"](1);
            console.log(_context5.t1);
            res.status(500).json({
              status: 403,
              error: 'invalid user Id '
            });

          case 27:
            ;

          case 28:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[1, 23], [6, 13]]);
  }));

  return function delete_user(_x10, _x11, _x12) {
    return _ref5.apply(this, arguments);
  };
}();

exports.delete_user = delete_user;