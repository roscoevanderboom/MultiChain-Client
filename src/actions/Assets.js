//
//
const { execFile } = require('child_process');
const path = require('path');

module.exports = {
  listAssets: (multichain) => {
    return new Promise((resolve, reject) => {
      multichain.listAssets((err, res) => {
        err ? reject(err) : resolve(res);
      });
    })
  },
  issue: (chainName, assetDetails, json, binaryPath) => {
    const { address, asset, restrict, qty, units } = assetDetails;

    let restrictions = null;
    if (restrict.send) {
      restrictions = 'send';
    }

    if (restrict.receive) {
      restrictions === 'send'
        ? restrictions = 'send,receive'
        : restrictions = 'receive';
    }

    const mcCLI = path.join(binaryPath, 'multichain-cli');
    return new Promise((resolve, reject) => {
      execFile(mcCLI, [
        chainName,
        'issue',
        address,
        JSON.stringify({
          name: asset,
          open: restrict.open,
          restrict: restrictions,
        }),
        qty,
        units,
        0,
        JSON.stringify({ json: json }),
      ], (err, res) => {
        err ? reject(err.message) : resolve(res);
      });
    });
  },
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

