//
const path = require('path');

let chainpath;

switch (process.platform) {
  case 'win32':
    const rootpath = process.argv[0].slice(0, process.argv[0].indexOf('Documents'));
    chainpath = path.join(rootpath, 'AppData/Roaming/MultiChain');
    break;
  case 'linux':
    chainpath = path.join('/home/user', '.multichain', '/');
    break;
  default:
    break;
}

module.exports = chainpath;
