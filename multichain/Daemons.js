const { execFile } = require('child_process');
const path = require('path');
const binaryPath = require('./BinaryPaths')

const mcUtil = path.join(binaryPath, 'multichain-util');
const mcd = path.join(binaryPath, 'multichaind');
const mcCLI = path.join(binaryPath, 'multichain-cli');

module.exports = {
  //
  createChain: (chainName) => {
    return new Promise((resolve, reject) => {
      execFile(mcUtil, ['create', chainName], (err, res) => {
        err ? reject(err) : resolve(res);
      });
    });
  },
  startMultichain: (chainName) => {
    return new Promise((resolve, reject) => {
      execFile(mcd, [chainName, 'daemon'], (err, res) => {
        err ? reject(err.message) : resolve(res);
      });

    });
  },
  stopMultichain: (chainName) => {
    return new Promise((resolve, reject) => {
      execFile(mcCLI, [chainName, 'stop'], (err, res) => {
        err ? reject(err) : resolve(res);
      });
    });
  },
  startIPFS: () => {
    return new Promise((resolve, reject) => {
      execFile('ipfs', ['daemon'], (err, res) => {
        err ? reject(err) : resolve(res);
      });
    });
  },
  stopIPFS: () => {
    return new Promise((resolve, reject) => {
      execFile('ipfs', ['shutdown'], (err, res) => {
        err ? reject(err) : resolve(res);
      });
    });
  },
};
