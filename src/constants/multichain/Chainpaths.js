//
const path = require('path');

let chainpath;

switch (process.platform) {
  case 'win32':
    chainpath = path.join(process.env.APPDATA, 'Multichain', '/');
    break;
  case 'linux':  
    chainpath = path.join('/home/user','.multichain', '/');
    break;
  default:    
    break;
}

module.exports = chainpath;
