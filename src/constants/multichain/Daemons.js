const { execFile, spawn } = require('child_process');
const path = require('path');

module.exports = {
  //
  createChain: (chainName, binaryPath) => {
    const mcUtil = path.join(binaryPath, 'multichain-util');
    return new Promise((resolve, reject) => {
      execFile(mcUtil, ['create', chainName], (err, res) => {
        err ? reject(err) : resolve(res);
      });
    });
  },
  startMultichain: (chainName, binaryPath) => {
    const mcd = path.join(binaryPath, 'multichaind');
    return new Promise((resolve, reject) => {
      const daemon = spawn(mcd, [`${chainName}`, '-daemon']);
      daemon.stdout.on('data', (data) => {
        resolve(data.toString());
      });
      daemon.stderr.on('data', (data) => {
        reject(data.toString());
      });
    });
  },
  stopMultichain: (chainName, binaryPath) => {
    const mcCLI = path.join(binaryPath, 'multichain-cli');
    return new Promise((resolve, reject) => {
      execFile(mcCLI, [chainName, 'stop'], (err, res) => {
        err ? reject(err) : resolve(res);
      });
    });
  }
};
