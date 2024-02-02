"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SignIn = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _getDataBaseConnection = require("lib/getDataBaseConnection");

var _User = require("src/entity/User");

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

// 密码加密库
var SignIn = /*#__PURE__*/function () {
  function SignIn() {
    (0, _classCallCheck2["default"])(this, SignIn);
    (0, _defineProperty2["default"])(this, "username", void 0);
    (0, _defineProperty2["default"])(this, "password", void 0);
    (0, _defineProperty2["default"])(this, "user", void 0);
    (0, _defineProperty2["default"])(this, "errors", {
      username: [],
      password: []
    });
  }

  (0, _createClass2["default"])(SignIn, [{
    key: "validate",
    // 登录的校验逻辑
    value: function () {
      var _validate = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        var connection, user, isMatch;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (this.username.trim() === '') {
                  this.errors.username.push('请填写用户名');
                }

                _context.next = 3;
                return (0, _getDataBaseConnection.getDatabaseConnection)();

              case 3:
                connection = _context.sent;
                _context.next = 6;
                return connection.manager.findOne(_User.User, {
                  where: {
                    username: this.username
                  }
                });

              case 6:
                user = _context.sent;
                this.user = user;

                if (user) {
                  // 判断数据库的密码和用户输入密码的加密hash是否一致
                  isMatch = _bcryptjs["default"].compareSync(this.password, user.passwordDigest);

                  if (!isMatch) {
                    this.errors.password.push('密码与用户名不匹配');
                  }
                } else {
                  this.errors.username.push('用户名不存在');
                }

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function validate() {
        return _validate.apply(this, arguments);
      }

      return validate;
    }()
  }, {
    key: "hasErrors",
    value: function hasErrors() {
      // 判断是否有错误
      return !!Object.values(this.errors).find(function (v) {
        return v.length > 0;
      });
    }
  }]);
  return SignIn;
}();

exports.SignIn = SignIn;