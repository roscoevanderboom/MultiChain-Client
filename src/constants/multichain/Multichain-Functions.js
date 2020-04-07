const { execFile } = require('child_process');
const path = require('path');

module.exports = {
  subscribe: (chainName, asset, binaryPath) => {
    return new Promise((resolve, reject) => {
      execFile(path.join(binaryPath, 'multichain-cli'), [
        chainName,
        'subscribe',
        `${asset.name}`
      ], (err, res) => {
        err ? reject(err) : resolve(res);
      });
    });
  },
  unSubscribe: (chainName, asset, binaryPath) => {
    return new Promise((resolve, reject) => {
      execFile(path.join(binaryPath, 'multichain-cli'), [
        chainName,
        'unsubscribe',
        `${asset.name}`
      ], (err, res) => {
        err ? reject(err) : resolve(res);
      });
    });
  },
}
