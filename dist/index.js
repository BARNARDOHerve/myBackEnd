"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _userPath = _interopRequireDefault(require("./routes/userPath"));

var _blogPath = _interopRequireDefault(require("./routes/blogPath"));

var _contactPath = _interopRequireDefault(require("./routes/contactPath"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var app = (0, _express["default"])();
app.use(_express["default"].json());
app.use('/', _userPath["default"]);
app.use('/', _blogPath["default"]);
app.use('/', _contactPath["default"]); // dotenv.config();
// const PORT = process.env.PORT;
// app.listen(PORT, () => console.log(`App running on port ${PORT}`));
// mongoose.connect("mongodb://localhost:27017/myCapstoneProject", {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
//     useUnifiedTopology:true
//   }, 
//   () => console.log("MongoDB connected .........")
// )

var _default = app;
exports["default"] = _default;