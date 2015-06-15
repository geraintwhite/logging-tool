var util = require('util'),
    colors = require('colors'),
    format = require('string-format');


module.exports = (function () {
  function getTimeStamp () {
    var x = new Date();

    var m = x.getMinutes(),
        s = x.getSeconds();

    return format('{}/{}/{} {}:{}:{}',
              x.getFullYear(), x.getMonth() + 1, x.getDate(), x.getHours(),
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
  logging.debug = true;

  /**
   * Log arguments on the `info` logging level
   * @name info
   * @function
   */
  logging.info = function () {
    if (logging.silent) return;
    console.info(colors.cyan.bold(format('[{}] Info {}', getTimeStamp(), getCallingMethod())));
    console.info(colors.cyan(stringifyArgs(arguments)), '\n');
  };

  /**
   * Log arguments on the `warn` logging level
   * @name warn
   * @function
   */
  logging.warn = function () {
    if (logging.silent) return;
    console.warn(colors.yellow.bold(format('[{}] Warning {}', getTimeStamp(), getCallingMethod())));
    console.warn(colors.yellow(stringifyArgs(arguments)), '\n');
  };

  /**
   * Log arguments on the default logging level
   * @name log
   * @function
   */
  logging.log = function () {
    if (!logging.debug || logging.silent) return;
    console.log(colors.white.bold(format('[{}] Log {}', getTimeStamp(), getCallingMethod())));
    console.log(colors.white(stringifyArgs(arguments)), '\n');
  };

  /**
   * Log arguments on the `error` logging level
   * @name error
   * @function
   */
  logging.error = function () {
    if (logging.silent) return;
    console.error(colors.red.bold(format('[{}] Error {}', getTimeStamp(), getCallingMethod())));
    console.error(colors.red(stringifyArgs(arguments)), '\n');
  };

  return logging;
})();
