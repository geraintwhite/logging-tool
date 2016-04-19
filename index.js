var util = require('util'),
    colors = require('colors'),
    dateformat = require('dateformat'),
    format = require('string-format');


module.exports = (function () {
  function getTimeStamp () {
    return dateformat(Date(), 'yyyy/mm/dd hh:MM:ss');
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


  /**
   * logging
   *
   * Usage:
   *
   * ```js
   * var logging = require('logging-tool');
   * ```
   *
   * @return {Object} Logging object containing the following fields:
   *
   *  - `debug` (Boolean): Show `logging.log` output if true (default true)
   *  - `silent` (Boolean): Don't show any output if true (default false)
   *  - `log` (Function): Log arguments on the default logging level
   *  - `info` (Function): Log arguments on the `info` logging level
   *  - `warn` (Function): Log arguments on the `warn` logging level
   *  - `error` (Function): Log arguments on the `error` logging level
   */


  var logging = {
    debug: true,
    silent: false
  };

  logging.info = function () {
    if (logging.silent) return;
    console.info(colors.cyan.bold(format('[{}] Info {}', getTimeStamp(), getCallingMethod())));
    console.info(colors.cyan(stringifyArgs(arguments)), '\n');
  };

  logging.warn = function () {
    if (logging.silent) return;
    console.warn(colors.yellow.bold(format('[{}] Warning {}', getTimeStamp(), getCallingMethod())));
    console.warn(colors.yellow(stringifyArgs(arguments)), '\n');
  };

  logging.log = function () {
    if (!logging.debug || logging.silent) return;
    console.log(colors.white.bold(format('[{}] Log {}', getTimeStamp(), getCallingMethod())));
    console.log(colors.white(stringifyArgs(arguments)), '\n');
  };

  logging.error = function () {
    if (logging.silent) return;
    console.error(colors.red.bold(format('[{}] Error {}', getTimeStamp(), getCallingMethod())));
    console.error(colors.red(stringifyArgs(arguments)), '\n');
  };

  return logging;
})();
