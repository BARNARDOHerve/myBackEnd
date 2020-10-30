"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteBlog = exports.updateBlog = exports.allBlogs = exports.singleBlog = exports.createBlog = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _blogMod = _interopRequireDefault(require("../models/blogMod"));

var createBlog = function createBlog(req, res, next) {
  _blogMod["default"].create(req.body).then(function (blog) {
    console.log('Blog Created', blog);
    res.statusCode = 200;
    res.json(blog);
  }, function (err) {
    return next(err);
  })["catch"](function (err) {
    return next(err);
  });
};

exports.createBlog = createBlog;

var singleBlog = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var id;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            id = req.params.id;
            _context.next = 4;
            return _blogMod["default"].findById(id).then(function (blogs) {
              res.statusCode = 200;
              res.setHeader('Content-Type', 'Application/json');
              res.json(blogs);
            });

          case 4:
            _context.next = 9;
            break;

          case 6:
            _context.prev = 6;
            _context.t0 = _context["catch"](0);
            throw new Error(_context.t0);

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 6]]);
  }));

  return function singleBlog(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.singleBlog = singleBlog;

var allBlogs = function allBlogs(req, res, next) {
  _blogMod["default"].find({}).then(function (blogs) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(blogs);
  }, function (err) {
    return next(err);
  })["catch"](function (err) {
    return next(err);
  });
};

exports.allBlogs = allBlogs;

var updateBlog = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    var blog, updatedBlog;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _blogMod["default"].findByIdAndUpdate({
              _id: req.params.id
            }, req.body);

          case 3:
            blog = _context2.sent;
            _context2.next = 6;
            return _blogMod["default"].findOne({
              _id: req.params.id
            });

          case 6:
            updatedBlog = _context2.sent;
            res.status(200).send(updatedBlog);
            _context2.next = 13;
            break;

          case 10:
            _context2.prev = 10;
            _context2.t0 = _context2["catch"](0);
            res.status(400).json(_context2.t0);

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 10]]);
  }));

  return function updateBlog(_x3, _x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}();

exports.updateBlog = updateBlog;

var deleteBlog = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
    var id, existBlog, delete_blog;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            id = req.params.id;
            _context3.prev = 1;
            _context3.next = 4;
            return _blogMod["default"].find({
              _id: id
            });

          case 4:
            existBlog = _context3.sent;

            if (!existBlog.length) {
              _context3.next = 19;
              break;
            }

            _context3.prev = 6;
            _context3.next = 9;
            return _blogMod["default"].deleteOne({
              _id: id
            });

          case 9:
            delete_blog = _context3.sent;
            res.status(200).json({
              message: "blog deleted ".concat(existBlog),
              delete_blog: delete_blog
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
              error: 'blog Id does not exist'
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
              error: 'invalid blog Id '
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

  return function deleteBlog(_x6, _x7, _x8) {
    return _ref3.apply(this, arguments);
  };
}();

exports.deleteBlog = deleteBlog;