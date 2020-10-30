"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteComment = exports.allComments = exports.singleComment = exports.createComment = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _contactMod = _interopRequireDefault(require("../models/contactMod"));

var createComment = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _req$body, Name, email, comment, checkcomment, newcomment, savedcomment;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _req$body = req.body, Name = _req$body.Name, email = _req$body.email, comment = _req$body.comment;
            _context.next = 4;
            return _contactMod["default"].findOne({
              email: email
            });

          case 4:
            checkcomment = _context.sent;

            if (!checkcomment) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return", res.status(400).json({
              error: 'Your comment has been sent!'
            }));

          case 7:
            newcomment = new _contactMod["default"]({
              Name: Name,
              email: email,
              comment: comment
            });
            console.log(newcomment);
            _context.next = 11;
            return newcomment.save();

          case 11:
            savedcomment = _context.sent;
            return _context.abrupt("return", res.status(201).json({
              msg: 'comment sent successfully',
              savedcomment: savedcomment
            }));

          case 15:
            _context.prev = 15;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", res.status(500).json({
              error: _context.t0.message
            }));

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 15]]);
  }));

  return function createComment(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.createComment = createComment;

var singleComment = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var id;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            id = req.params.id;
            _context2.next = 4;
            return _contactMod["default"].findById(id).then(function (comments) {
              res.statusCode = 200;
              res.setHeader('Content-Type', 'Application/json');
              res.json(comments);
            });

          case 4:
            _context2.next = 9;
            break;

          case 6:
            _context2.prev = 6;
            _context2.t0 = _context2["catch"](0);
            throw new Error(_context2.t0);

          case 9:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 6]]);
  }));

  return function singleComment(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.singleComment = singleComment;

var allComments = function allComments(req, res, next) {
  _contactMod["default"].find().then(function (contacts) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(contacts);
  })["catch"](function (err) {
    res.status(404).json(err);
  });
};

exports.allComments = allComments;

var deleteComment = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
    var id, existcomment, delete_comment;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            id = req.params.id;
            _context3.prev = 1;
            _context3.next = 4;
            return _contactMod["default"].find({
              _id: id
            });

          case 4:
            existcomment = _context3.sent;

            if (!existcomment.length) {
              _context3.next = 19;
              break;
            }

            _context3.prev = 6;
            _context3.next = 9;
            return _contactMod["default"].deleteOne({
              _id: id
            });

          case 9:
            delete_comment = _context3.sent;
            res.status(200).json({
              message: "comment deleted ".concat(existcomment),
              delete_comment: delete_comment
            });
            _context3.next = 16;
            break;

          case 13:
            _context3.prev = 13;
            _context3.t0 = _context3["catch"](6);
            throw new Error(_context3.t0);

          case 16:
            ;
            _context3.next = 20;
            break;

          case 19:
            res.status(404).json({
              status: 403,
              error: 'comment Id does not exist'
            });

          case 20:
            ;
            _context3.next = 27;
            break;

          case 23:
            _context3.prev = 23;
            _context3.t1 = _context3["catch"](1);
            console.log(_context3.t1);
            res.status(500).json({
              status: 403,
              error: 'invalid comment Id '
            });

          case 27:
            ;

          case 28:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 23], [6, 13]]);
  }));

  return function deleteComment(_x5, _x6, _x7) {
    return _ref3.apply(this, arguments);
  };
}();

exports.deleteComment = deleteComment;