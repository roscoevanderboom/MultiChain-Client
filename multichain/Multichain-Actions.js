const { execFile } = require('child_process');
const path = require('path');
const binaryPath = require('./BinaryPaths');
const multichainCLI = path.join(binaryPath, 'multichain-cli');

module.exports = {
  subscribe: (chainName, asset) => {
    console.log(asset)
    return new Promise((resolve, reject) => {
      execFile(multichainCLI, [
        chainName,
        'subscribe',
        `${asset.name}`
      ], (err, res) => {
        if (err) {
          return reject(err);
        }
        resolve(res);
      });
    });
  },
  getnewaddress: (chainName, asset) => {
    console.log(asset)
    return new Promise((resolve, reject) => {
      execFile(multichainCLI, [
        chainName,
        'getnewaddress'
      ], (err, res) => {
        if (err) {
          return reject(err);
        }
        resolve(res);
      });
    });
  },
}
