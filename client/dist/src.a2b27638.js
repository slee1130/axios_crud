// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/lib/Observer.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unsubscribe = exports.subscribe = exports.setState = exports.initState = exports.getState = void 0;
var globalState = {};

var subscribe = function subscribe(key, observer) {
  globalState[key]._observer = observers.add(observer);
};

exports.subscribe = subscribe;

var unsubscribe = function unsubscribe(key, observer) {
  globalState[key]._observer = observers.delete(observer);
};

exports.unsubscribe = unsubscribe;

var _notify = function _notify(key) {
  return globalState[key]._observers.forEach(function (observer) {
    return observer();
  });
};

var initState = function initState(_ref) {
  var key = _ref.key,
      defaultValue = _ref.defaultValue;
  if (key in globalState) throw new Error("the key is already existing");
  globalState[key] = {
    _state: defaultValue,
    _observer: new Set()
  };
  return key;
};

exports.initState = initState;

var getState = function getState(key) {
  if (!(key in globalState)) throw new Error("the key is already");
  return globalState[key]._state;
};

exports.getState = getState;

var setState = function setState(key) {
  return function (newState) {
    if (!(key in globalState)) throw new Error("the key is already");

    if (typeof newState === "function") {
      var state = getState(key);
      globalState[key]._state = newState(state);
    } else {
      globalState[key]._state = newState;
    }

    _notify(key);
  };
};

exports.setState = setState;
},{}],"src/lib/Router.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Observer = require("./Observer.js");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var Router = /*#__PURE__*/function () {
  function Router(_ref) {
    var pageState = _ref.pageState;

    _classCallCheck(this, Router);

    this.routes;
    this.setPage = (0, _Observer.setState)(pageState);
    this.currIndex = 0;
    this.init();
  }

  _createClass(Router, [{
    key: "init",
    value: function init() {
      history.replaceState({
        index: 0
      }, "");
      window.addEventListener("popstate", this.handlePopstate.bind(this));
    }
  }, {
    key: "setRoutes",
    value: function setRoutes(routes) {
      this.routes = routes;
      this.handlePopstate();
    }
  }, {
    key: "handlePopstate",
    value: function handlePopstate() {
      var path = location.pathname;
      var Page;
      var params;

      for (var _i = 0, _Object$entries = Object.entries(this.routes); _i < _Object$entries.length; _i++) {
        var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
            routePath = _Object$entries$_i[0],
            component = _Object$entries$_i[1];

        if (this.match(routePath, path)) {
          Page = component;
          params = this.parseParams(routePath, path);
          break;
        }
      }

      if (!Page) {
        this.replace("/");
        return;
      }

      this.setPage({
        Page: Page,
        params: params
      });
      this.currIndex = history.state.index;
    }
  }, {
    key: "push",
    value: function push(pathname) {
      history.pushState({
        index: this.currIndex + 1
      }, "", pathname);
      this.handlePopstate();
    }
  }, {
    key: "replace",
    value: function replace(pathname) {
      history.replaceState({
        index: this.currIndex
      }, "", pathname);
      this.handlePopstate();
    }
  }, {
    key: "pop",
    value: function pop() {
      if (!this.currIndex) {
        history.pushState({
          index: this.currIndex - 1
        }, "", "/");
        this.handlePopstate();
        return;
      }

      history.back();
    }
  }, {
    key: "match",
    value: function match(routePath, path) {
      var routeChunks = routePath.split("/");
      var chunks = path.split("/");

      if (routeChunks.length !== chunks.length) {
        return false;
      }

      for (var i = 0; i < chunks.length; i++) {
        if (routeChunks[i][0] === ":" || routeChunks[i] === chunks[i]) {
          continue;
        }

        return false;
      }

      return true;
    }
  }, {
    key: "parseParams",
    value: function parseParams(routePath, path) {
      var params = {};
      var routeChunks = routePath.split("/");
      var chunks = path.split("/");

      for (var i = 0; i < chunks.length; i++) {
        if (routeChunks[i][0] !== ":") {
          continue;
        }

        params[routeChunks[i].slice(1)] = chunks[i];
      }

      return params;
    }
  }, {
    key: "isBack",
    value: function isBack(index) {
      return index < this.currIndex;
    }
  }]);

  return Router;
}();

exports.default = Router;
},{"./Observer.js":"src/lib/Observer.js"}],"src/utils/dom.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var dom = {
  $: function $(target) {
    var root = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
    return root.querySelector(target);
  },
  $all: function $all(target) {
    var root = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
    return root.querySelectorAll(target);
  },
  onEvent: function onEvent(target, eventType, fn) {
    target.addEventListener(eventType, fn);
  },
  createElement: function createElement(_ref) {
    var _element$classList;

    var tagName = _ref.tagName,
        _ref$className = _ref.className,
        className = _ref$className === void 0 ? [] : _ref$className,
        _ref$value = _ref.value,
        value = _ref$value === void 0 ? "" : _ref$value;
    var element = document.createElement(tagName);

    (_element$classList = element.classList).add.apply(_element$classList, _toConsumableArray(className));

    if (value) element.innerHTML = value;
    return element;
  }
};
var _default = dom;
exports.default = _default;
},{}],"src/lib/Component.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Observer = require("../lib/Observer");

var _dom = _interopRequireDefault(require("../utils/dom"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var Component = /*#__PURE__*/function () {
  function Component() {
    var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "div";
    var props = arguments.length > 1 ? arguments[1] : undefined;

    _classCallCheck(this, Component);

    this.$target = _dom.default.createElement({
      tagName: type
    });
    this.props = props;
    this.state = this.initState();
    this.keys = [];
    this.components = {};
    this.init();
    this.reRender = this.render.bind(this);
  }

  _createClass(Component, [{
    key: "init",
    value: function init() {
      this.render();
      this.addEvent();
    }
  }, {
    key: "initState",
    value: function initState() {
      return;
    }
  }, {
    key: "addEvent",
    value: function addEvent() {
      return;
    }
  }, {
    key: "render",
    value: function render() {
      this.components = this.setComponents();
      this.$target.innerHTML = this.setTemplate();
      this.setLayout();
    } //innerHTML

  }, {
    key: "setTemplate",
    value: function setTemplate() {
      throw new Error("템플릿을 생성해주세요.");
    } //컴포넌트를 각 위치에 맞게 replace

  }, {
    key: "setLayout",
    value: function setLayout() {
      for (var _i = 0, _Object$entries = Object.entries(this.components); _i < _Object$entries.length; _i++) {
        var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
            key = _Object$entries$_i[0],
            Comp = _Object$entries$_i[1];

        var replacedElem = this.$target.querySelector("#".concat(key));
        console.log(Comp);
        replacedElem === null || replacedElem === void 0 ? void 0 : replacedElem.replaceWith(Comp.$target);
      }
    }
  }, {
    key: "setComponents",
    value: function setComponents() {
      return {};
    } //클래스 추가 메소드

  }, {
    key: "addClass",
    value: function addClass() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      this.$target.className = args.join(" ");
    } //구독한 상태 변경시 렌더링 되는 함수

  }, {
    key: "subscribedRender",
    value: function subscribedRender() {
      this.unsubscribe(); //하위 컴포넌트 구독 해제

      this.render(); //하위 컴포넌트 재생성
    } //key에 속한 것들 render

  }, {
    key: "subscribe",
    value: function subscribe() {
      var _this = this;

      this.keys.forEach(function (key) {
        return (0, _Observer.subscribe)(key, _this.reRender);
      });
    }
  }, {
    key: "unsubscribe",
    value: function unsubscribe() {
      var _this2 = this;

      var isCurrentComp = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      if (!isCurrentComp && this.keys.length) {
        this.keys.forEach(function (key) {
          return (0, _Observer.unsubscribe)(key, _this2.reRender);
        });
      } //하위 컴포넌트들도 리렌더링되기 때문에 unsubscribe


      var components = Object.values(this.components);
      components.forEach(function (component) {
        component.unsubscribe(false);
      });
    } //TODO: 하위 전부다 렌더링 되는 것 해결
    //TODO: throw Error를 에러처리를 따로 해놓지 않는다면 배포 당시에 삭제해야되나??

  }, {
    key: "setState",
    value: function setState(newState) {
      if (!this.state) throw Error("변경할 상태가 없습니다!");

      if (typeof newState === "function") {
        this.state = _objectSpread(_objectSpread({}, this.state), newState(this.state));
      } else {
        this.state = _objectSpread(_objectSpread({}, this.state), newState);
      }

      this.reRender();
    }
  }]);

  return Component;
}();

exports.default = Component;
},{"../lib/Observer":"src/lib/Observer.js","../utils/dom":"src/utils/dom.js"}],"src/store/PageState.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pageState = void 0;

var _Observer = require("../lib/Observer.js");

var pageState = (0, _Observer.initState)({
  key: "",
  defaultValue: null
});
exports.pageState = pageState;
},{"../lib/Observer.js":"src/lib/Observer.js"}],"src/App.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Component2 = _interopRequireDefault(require("./lib/Component.js"));

var _Observer = require("./lib/Observer.js");

var _PageState = require("./store/PageState.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var App = /*#__PURE__*/function (_Component) {
  _inherits(App, _Component);

  var _super = _createSuper(App);

  function App() {
    var _this;

    _classCallCheck(this, App);

    _this = _super.call(this);

    _this.addClass(["app"]);

    _this.keys = [_PageState.pageState];

    _this.subscribe();

    return _this;
  }

  _createClass(App, [{
    key: "setTemplate",
    value: function setTemplate() {
      return "<div id='page'></div>";
    }
  }, {
    key: "setComponents",
    value: function setComponents() {
      var page = (0, _Observer.getState)(_PageState.pageState);
      if (!page) return {};
      return {
        page: new page.Page()
      };
    }
  }]);

  return App;
}(_Component2.default);

exports.default = App;
},{"./lib/Component.js":"src/lib/Component.js","./lib/Observer.js":"src/lib/Observer.js","./store/PageState.js":"src/store/PageState.js"}],"src/page/Home.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _index = require("../index.js");

var _Component2 = _interopRequireDefault(require("../lib/Component.js"));

var _dom = _interopRequireDefault(require("../utils/dom.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var MainPage = /*#__PURE__*/function (_Component) {
  _inherits(MainPage, _Component);

  var _super = _createSuper(MainPage);

  function MainPage() {
    _classCallCheck(this, MainPage);

    return _super.call(this);
  }

  _createClass(MainPage, [{
    key: "addEvent",
    value: function addEvent() {
      _dom.default.onEvent(this.$target, "click", this.handleClick.bind(this));
    }
  }, {
    key: "handleClick",
    value: function handleClick(e) {
      if (e.target.tagName !== "BUTTON") return;

      _index.router.push("/sub");
    }
  }, {
    key: "setTemplate",
    value: function setTemplate() {
      return "\n        <h1>\uBA54\uC778\uD398\uC774\uC9C0</h1>\n        <button>\uC11C\uBE0C\uD398\uC774\uC9C0\uB85C \uC774\uB3D9</button>\n    ";
    }
  }]);

  return MainPage;
}(_Component2.default);

exports.default = MainPage;
},{"../index.js":"src/index.js","../lib/Component.js":"src/lib/Component.js","../utils/dom.js":"src/utils/dom.js"}],"src/page/Login.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Component2 = _interopRequireDefault(require("../lib/Component.js"));

var _Router = require("../lib/Router.js");

var _dom = _interopRequireDefault(require("../utils/dom.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var SubPage = /*#__PURE__*/function (_Component) {
  _inherits(SubPage, _Component);

  var _super = _createSuper(SubPage);

  function SubPage() {
    _classCallCheck(this, SubPage);

    return _super.call(this);
  }

  _createClass(SubPage, [{
    key: "addEvent",
    value: function addEvent() {
      _dom.default.onEvent(this.$target, "click", this.handleClick.bind(this));
    }
  }, {
    key: "handleClick",
    value: function handleClick(e) {
      if (e.target.tagName !== "BUTTON") return;

      _Router.router.push("/");
    }
  }, {
    key: "setTemplate",
    value: function setTemplate() {
      return "\n        <h1>\uC11C\uBE0C \uD398\uC774\uC9C0</h1>\n        <button>\uBA54\uC778\uD398\uC774\uC9C0\uB85C \uC774\uB3D9</button>\n      ";
    }
  }]);

  return SubPage;
}(_Component2.default);

exports.default = SubPage;
},{"../lib/Component.js":"src/lib/Component.js","../lib/Router.js":"src/lib/Router.js","../utils/dom.js":"src/utils/dom.js"}],"src/store/pageState.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pageState = void 0;

var _Observer = require("../lib/Observer.js");

var pageState = (0, _Observer.initState)({
  key: "pageState",
  defaultValue: null
});
exports.pageState = pageState;
},{"../lib/Observer.js":"src/lib/Observer.js"}],"src/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.router = void 0;

var _Router = _interopRequireDefault(require("./lib/Router.js"));

var _App = _interopRequireDefault(require("./App.js"));

var _Home = _interopRequireDefault(require("./page/Home.js"));

var _Login = _interopRequireDefault(require("./page/Login.js"));

var _pageState = require("./store/pageState.js");

var _dom = _interopRequireDefault(require("./utils/dom.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var root = _dom.default.$("#root");

var routes = {
  "/": _Home.default,
  "/login": _Login.default
};
var router = new _Router.default({
  pageState: _pageState.pageState
});
exports.router = router;
router.setRoutes(routes);
var app = new _App.default();
root.appendChild(app.$target);
},{"./lib/Router.js":"src/lib/Router.js","./App.js":"src/App.js","./page/Home.js":"src/page/Home.js","./page/Login.js":"src/page/Login.js","./store/pageState.js":"src/store/pageState.js","./utils/dom.js":"src/utils/dom.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "50459" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.js"], null)
//# sourceMappingURL=/src.a2b27638.js.map