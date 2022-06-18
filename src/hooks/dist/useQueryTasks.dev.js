"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useQueryTasks = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _reactQuery = require("react-query");

var _fetchDelay = require("../utils/fetchDelay");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getTasks = function getTasks() {
  var _ref, data;

  return regeneratorRuntime.async(function getTasks$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.t0 = regeneratorRuntime;
          _context.t1 = _axios["default"].get('https://jsonplaceholder.typicode.com/todos?_limit=3');
          _context.next = 4;
          return regeneratorRuntime.awrap((0, _fetchDelay.delay)(5000));

        case 4:
          _context.t2 = _context.sent;
          _context.t3 = _context.t1.then.call(_context.t1, _context.t2);
          _context.next = 8;
          return _context.t0.awrap.call(_context.t0, _context.t3);

        case 8:
          _ref = _context.sent;
          data = _ref.data;
          return _context.abrupt("return", data);

        case 11:
        case "end":
          return _context.stop();
      }
    }
  });
};

var useQueryTasks = function useQueryTasks() {
  return (0, _reactQuery.useQuery)({
    queryKey: ['tasks'],
    queryFn: getTasks,
    staleTime: Infinity
  });
};

exports.useQueryTasks = useQueryTasks;