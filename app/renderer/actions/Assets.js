//
//
const { execFile } = require('child_process');
const path = require('path');

const binaryPath = require('../multichain/BinaryPaths')
const mcCLI = path.join(binaryPath, 'multichain-cli');

module.exports = {
  listAssets: (multichain) => {
    return new Promise((resolve, reject) => {
      multichain.listAssets((err, res) => {
        err ? reject(err) : resolve(res);
      });
    })
  },
  issue: (chainName, assetDetails, json) => {
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
  }
}

