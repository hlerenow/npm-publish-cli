function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

console.log(process.env);
export default {
  a: function () {
    var _a = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              console.log('I\'m a');
              _context.next = 3;
              return new Promise(function (resolve, reject) {
                resolve();
              });

            case 3:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function a() {
      return _a.apply(this, arguments);
    }

    return a;
  }(),
  b: function b() {
    console.log('I\'m b');
  },
  version: '1.0.0'
};