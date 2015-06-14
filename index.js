var util = require('util'),
    colors = require('colors');

module.exports = function (silent) {
  function getTimeStamp () {
    var x = new Date();

    var m = x.getMinutes(),
        s = x.getSeconds();

    return '{}/{}/{} {}:{}:{}'
      .format(x.getFullYear(), x.getMonth() + 1, x.getDate(), x.getHours(),
              m > 10 ? m : '0' + m, s > 10 ? s : '0' + s);
  }

  function stringifyArgs (args) {
    var str = '';
    for (var key in args) {
      if (typeof args[key] == 'object') {
        str += util.inspect(args[key]) + '\n';
      } else {
        str += args[key] + ' ';
      }
    }
    return str;
  }

  function getCallingMethod () {
    return new Error().stack.split('\n')[3].trim();
  }

  var logging = {};

  logging.info = function () {
    if (silent) return;
    console.info(colors.cyan.bold('[{}] Info {}'.format(getTimeStamp(), getCallingMethod())));
    console.info(colors.cyan(stringifyArgs(arguments)), '\n');
  };

  logging.warn = function () {
    if (silent) return;
    console.warn(colors.yellow.bold('[{}] Warning {}'.format(getTimeStamp(), getCallingMethod())));
    console.warn(colors.yellow(stringifyArgs(arguments)), '\n');
  };

  logging.log = function () {
    if (silent) return;
    console.log(colors.white.bold('[{}] Log {}'.format(getTimeStamp(), getCallingMethod())));
    console.log(colors.white(stringifyArgs(arguments)), '\n');
  };

  logging.error = function () {
    if (silent) return;
    console.error(colors.red.bold('[{}] Error {}'.format(getTimeStamp(), getCallingMethod())));
    console.error(colors.red(stringifyArgs(arguments)), '\n');
  };

  return logging;
};
