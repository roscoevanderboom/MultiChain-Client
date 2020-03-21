//
//
let url;

switch (process.platform) {
  case 'win32':
    // url = 'http://127.0.0.1:8080/ipfs/QmUH4ykeQhEAtapxnaE792F4hiAYsrRrCGpXJuc1nHE6Vy';

    url = 'https://www.multichain.com/download/multichain-windows-2.0.3.zip';
    break;
  case 'linux':
    url = 'https://www.multichain.com/download/multichain-2.0-latest.tar.gz';
    break;
  default:
    url = '';
    break;
}
module.exports = url;
