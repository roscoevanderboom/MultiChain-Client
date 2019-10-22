const { execFile } = require('child_process');
const path = require('path');
const binaryPath = require('./BinaryPaths')

const mcUtil = path.join(binaryPath, 'multichain-util');
const mcd = path.join(binaryPath, 'multichaind');
const mcCLI = path.join(binaryPath, 'multichain-cli');

module.exports = {
  getInfo: (chainName) => {
    return new Promise((resolve, reject) => {
      execFile(mcCLI, [chainName, 'getinfo'], (err, res) => {
        err ? reject(err) : resolve(JSON.parse(res));
      });
    });
  },
  subscribe: (chainName, asset) => {
    return new Promise((resolve, reject) => {
      execFile(mcCLI, [
        chainName,
        'subscribe',
        `${asset.name}`
      ], (err, res) => {
        err ? reject(err) : resolve(res);
      });
    });
  },
  unSubscribe: (chainName, asset) => {
    return new Promise((resolve, reject) => {
      execFile(mcCLI, [
        chainName,
        'unsubscribe',
        `${asset.name}`
      ], (err, res) => {
        err ? reject(err) : resolve(res);
      });
    });
  },
}
