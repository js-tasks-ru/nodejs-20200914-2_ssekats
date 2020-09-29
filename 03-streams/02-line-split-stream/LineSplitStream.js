const stream = require('stream');
const os = require('os');

let _currentString;

class LineSplitStream extends stream.Transform {
  constructor(options) {
    super(options);
    _currentString = '';
  }

  _transform(chunk, encoding, callback) {
    try {
      const chunks = chunk.toString().split(os.EOL);
      if (chunks.length > 1) {
        _currentString += chunks[0];
        callback(null, _currentString);
        chunks.shift();
        _currentString = chunks.join();
      } else {
        _currentString += chunks[0];
        callback();
      }
    } catch (e) {
      // skip
    }
  }

  _flush(callback) {
    if (_currentString) {
      callback(null, _currentString);
    }
  }
}

module.exports = LineSplitStream;
