# logging-tool
Colourful logging module with different logging levels

![Logging levels](http://cdn.dvbris.com/logging-tool.png)

## Installation

```sh
$ npm install logging-tool
```


## Documentation

### logging

Usage:

```js
var logging = require('logging-tool');
```

#### Return
- **Object** Logging object containing the following fields:
 - `debug` (Boolean): Show `logging.log` output if true (default true)
 - `silent` (Boolean): Don't show any output if true (default false)
 - `log` (Function): Log arguments on the default logging level
 - `info` (Function): Log arguments on the `info` logging level
 - `warn` (Function): Log arguments on the `warn` logging level
 - `error` (Function): Log arguments on the `error` logging level


## How to contribute

1. File an issue in the repository, using the bug tracker, describing the
   contribution you'd like to make. This will help us to get you started on the
   right foot.
2. Fork the project in your account and create a new branch:
   `your-great-feature`.
3. Commit your changes in that branch.
4. Open a pull request, and reference the initial issue in the pull request
   message.


## License
See the [LICENSE](./LICENSE) file.
