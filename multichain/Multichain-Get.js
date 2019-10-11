const { execFile } = require('child_process');
const path = require('path');
const binaryPath = require('./BinaryPaths');
const multichainCLI = path.join(binaryPath, 'multichain-cli');

module.exports = {
  getInfo: (chainName) => {
    return new Promise((resolve, reject) => {
      execFile(multichainCLI, [chainName, 'getinfo'], (err, res) => {
        err ? reject(err) : resolve(JSON.parse(res));
      });
    });
  },
  getBlockchainParameters: (chainName) => {
    return new Promise((resolve, reject) => {
      execFile(multichainCLI, [chainName, 'getblockchainparams'], (err, res) => {
        err ? reject(err) : resolve(JSON.parse(res));
      });
    });
  },
  listStreams: (chainName) => {
    return new Promise((resolve, reject) => {
      execFile(multichainCLI, [chainName, 'liststreams'], (err, res) => {
        err ? reject(err) : resolve(JSON.parse(res));
      });
    });
  },
  listAddresses: (chainName) => {
    return new Promise((resolve, reject) => {
      execFile(multichainCLI, [chainName, 'listaddresses'], (err, res) => {
        err ? reject(err) : resolve(JSON.parse(res));
      });
    });
  },
  listAssets: (chainName) => {
    return new Promise((resolve, reject) => {
      execFile(multichainCLI, [chainName, 'listassets'], (err, res) => {
        err ? reject(err) : resolve(JSON.parse(res));
      });
    });
  },
  getPeerInfo: (chainName) => {
    return new Promise((resolve, reject) => {
      execFile(multichainCLI, [chainName, 'getpeerinfo'], (err, res) => {
        err ? reject(err) : resolve(JSON.parse(res));
      });
    });
  },
  listPermissions: (chainName) => {
    return new Promise((resolve, reject) => {
      execFile(multichainCLI, [chainName, 'listpermissions'], (err, res) => {
        err ? reject(err) : resolve(JSON.parse(res));
      });
    });
  },
}
