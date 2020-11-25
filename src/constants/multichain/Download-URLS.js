//
//
let url;

switch (process.platform) {
  case 'win32':
    url = 'https://www.multichain.com/download/multichain-windows-2.1.1.zip';
    break;
  case 'linux':
    url = 'https://www.multichain.com/download/multichain-2-latest.tar.gz';
    break;
  default:
    url = '';
    break;
}
module.exports = url;
