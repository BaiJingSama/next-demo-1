"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.User = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _initializerDefineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/initializerDefineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _applyDecoratedDescriptor2 = _interopRequireDefault(require("@babel/runtime/helpers/applyDecoratedDescriptor"));

var _initializerWarningHelper2 = _interopRequireDefault(require("@babel/runtime/helpers/initializerWarningHelper"));

var _typeorm = require("typeorm");

var _getDataBaseConnection = require("lib/getDataBaseConnection");

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _lodash = _interopRequireDefault(require("lodash"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _temp;

var User = (_dec = (0, _typeorm.Entity)('users'), _dec2 = (0, _typeorm.PrimaryGeneratedColumn)('increment'), _dec3 = (0, _typeorm.Column)('varchar'), _dec4 = (0, _typeorm.Column)('varchar'), _dec5 = (0, _typeorm.CreateDateColumn)(), _dec6 = (0, _typeorm.UpdateDateColumn)(), _dec7 = (0, _typeorm.OneToMany)('Post', 'author'), _dec8 = (0, _typeorm.OneToMany)('Comment', 'user'), _dec9 = (0, _typeorm.BeforeInsert)(), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function () {
  function User() {
    (0, _classCallCheck2["default"])(this, User);
    (0, _initializerDefineProperty2["default"])(this, "id", _descriptor, this);
    (0, _initializerDefineProperty2["default"])(this, "username", _descriptor2, this);
    (0, _initializerDefineProperty2["default"])(this, "passwordDigest", _descriptor3, this);
    (0, _initializerDefineProperty2["default"])(this, "createdAt", _descriptor4, this);
    (0, _initializerDefineProperty2["default"])(this, "updatedAt", _descriptor5, this);
    (0, _initializerDefineProperty2["default"])(this, "posts", _descriptor6, this);
    (0, _initializerDefineProperty2["default"])(this, "comments", _descriptor7, this);
    (0, _defineProperty2["default"])(this, "errors", {
      username: [],
      password: [],
      passwordConfirmation: []
    });
    (0, _defineProperty2["default"])(this, "password", void 0);
    (0, _defineProperty2["default"])(this, "passwordConfirmation", void 0);
  }

  (0, _createClass2["default"])(User, [{
    key: "validate",
    value: function () {
      var _validate = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        var found;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                // 错误判断
                if (this.username.trim() === '') {
                  this.errors.username.push('不能为空');
                }

                if (!/[a-zA-Z0-9]/.test(this.username.trim())) {
                  this.errors.username.push('用户名格式不合法');
                }

                if (this.username.trim().length > 24 || this.username.trim().length <= 4) {
                  this.errors.username.push('用户名长度必须为4-24位');
                } // 从数据库中搜索用户名是否存在


                _context.next = 5;
                return (0, _getDataBaseConnection.getDatabaseConnection)();

              case 5:
                _context.next = 7;
                return _context.sent.manager.find(User, {
                  username: this.username
                });

              case 7:
                found = _context.sent;

                if (found.length > 0) {
                  this.errors.username.push('用户名已存在，不能重复注册');
                }

                if (this.password === '') {
                  this.errors.password.push('密码不能为空');
                }

                if (this.password !== this.passwordConfirmation) {
                  this.errors.passwordConfirmation.push('两次密码不一致');
                }

              case 11:
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
  }, {
    key: "generatePasswordDigest",
    value: function generatePasswordDigest() {
      // 生成salt值
      var salt = _bcryptjs["default"].genSaltSync(10); // 将密码和salt值一起散列化将结果的hash值保存为密码


      this.passwordDigest = _bcryptjs["default"].hashSync(this.password, salt);
    } // toJSON方法能让JSON.stringify()能将对象转换为方法返回的字符串

  }, {
    key: "toJSON",
    value: function toJSON() {
      // omit方法能从一个对象中忽略指定的属性，可以自己实现，也能直接用库，大部分的库都有 例如lodash
      return _lodash["default"].omit(this, ['password', 'passwordConfirmation', 'passwordDigest', 'errors']);
    }
  }]);
  return User;
}(), _temp), (_descriptor = (0, _applyDecoratedDescriptor2["default"])(_class2.prototype, "id", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = (0, _applyDecoratedDescriptor2["default"])(_class2.prototype, "username", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = (0, _applyDecoratedDescriptor2["default"])(_class2.prototype, "passwordDigest", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = (0, _applyDecoratedDescriptor2["default"])(_class2.prototype, "createdAt", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = (0, _applyDecoratedDescriptor2["default"])(_class2.prototype, "updatedAt", [_dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = (0, _applyDecoratedDescriptor2["default"])(_class2.prototype, "posts", [_dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = (0, _applyDecoratedDescriptor2["default"])(_class2.prototype, "comments", [_dec8], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), (0, _applyDecoratedDescriptor2["default"])(_class2.prototype, "generatePasswordDigest", [_dec9], Object.getOwnPropertyDescriptor(_class2.prototype, "generatePasswordDigest"), _class2.prototype)), _class2)) || _class);
exports.User = User;