const stream = require('stream');
const os = require('os');

class LineSplitStream extends stream.Transform {
  constructor(options) {
    super(options);
    this._currentString = '';
  }

  _transform(chunk, encoding, callback) {
    const chunks = chunk.toString().split(os.EOL);
    if (chunks.length > 1) {
      this._currentString += chunks[0];
      callback(null, this._currentString);
      chunks.shift();
      this._currentString = chunks.join();
    } else {
      this._currentString += chunks[0];
      callback();
    }
  }

  _flush(callback) {
    if (this._currentString) {
      callback(null, this._currentString);
    }
  }
}

module.exports = LineSplitStream;
