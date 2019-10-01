//
const path = require('path');

let BinaryPaths;

switch (process.platform) {
  case 'win32':
    BinaryPaths = path.join(__dirname, 'windows/');
    break;
  case 'linux':
    BinaryPaths = path.join(__dirname, 'linux/');
    break;
  default:
    BinaryPaths = path.join(__dirname, 'mac/');
    break;
}

module.exports = BinaryPaths;
