"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _blogContr = require("../controller/blogContr");

var _auth = require("../midleware/auth");

var _validation = require("../midleware/validation");

var blogRouter = _express["default"].Router();

blogRouter.post('/Blogs/Create', _auth.auth, _validation.validateblog, _blogContr.createBlog);
blogRouter.get('/Blogs', _blogContr.allBlogs);
blogRouter.get('/Blogs/Blog/:id', _blogContr.singleBlog);
blogRouter.put('/Blogs/Update/:id', _blogContr.updateBlog);
blogRouter["delete"]('/Blogs/Delete/:id', _blogContr.deleteBlog);
var _default = blogRouter;
exports["default"] = _default;