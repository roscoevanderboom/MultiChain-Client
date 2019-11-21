//
const path = require('path');

let BinaryPath;

switch (process.platform) {
  case 'win32':
    BinaryPath = path.join(__dirname, 'windows/');
    break;
  case 'linux':
    BinaryPath = path.join(__dirname, 'linux/');
    break;
  default:
    BinaryPath = path.join(__dirname, 'mac/');
    break;
}
module.exports = BinaryPath;
