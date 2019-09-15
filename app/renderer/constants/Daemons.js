const { execFile } = require('child_process');
const path = require('path');

const mc = path.join(process.env.INIT_CWD, 'multichain/')

const mcUtil = path.join(mc, 'multichain-util')
const mcd = path.join(mc, 'multichaind')
const mcCLI = path.join(mc, 'multichain-cli')

module.exports = {
  //
  createChain: (chainName) => {
    return new Promise((resolve, reject) => {
      execFile(mcUtil, ['create', chainName], (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  },
  startMultichain: (chainName) => {
    return new Promise((resolve, reject) => {
      execFile(mcd, [chainName, 'daemon'], (err, res) => {
               if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  },
  stopMultichain: (chainName) => {
    return new Promise((resolve, reject) => {
      execFile(mcCLI, [chainName, 'stop'], (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  },
  startIPFS: () => {
    return new Promise((resolve, reject) => {
      execFile('ipfs', ['daemon'], (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  },
  stopIPFS: () => {
    return new Promise((resolve, reject) => {
      execFile('ipfs', ['shutdown'], (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  },
};
