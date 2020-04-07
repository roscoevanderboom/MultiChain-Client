//
//
const { execFile } = require('child_process');
const path = require('path');

module.exports = {
  createStream: (chainName, options, binaryPath) => {   
    const { name, jsonData, restrict } = options;
    const keys = ['write', 'read', 'onchain', 'offchain'];
    let restrictions = '';
    const mcCLI = path.join(binaryPath, 'multichain-cli');

    keys.forEach(key => {
      if (restrict[key] && restrictions === '') {
        restrictions = restrictions.concat(key);
      } else if (restrict[key] && restrictions !== '') {
        restrictions = restrictions.concat(',', key);
      }
    })

    if (!restrict.read && !restrict.write && !restrict.onchain && !restrict.offchain) {
      restrictions = '';
    }

    return new Promise((resolve, reject) => {
      execFile(mcCLI, [
        chainName,
        'create',
        'stream',
        name,
        JSON.stringify({
          restrict: restrictions
        }),
        jsonData
      ], (err, res) => {
        err ? reject(err.message) : resolve(res);
      });
    })
  },
  listStreams: (multichain) => {
    return new Promise((resolve, reject) => {
      multichain.listStreams((err, res) => {
        err ? reject(err) : resolve(res);
      });
    })
  },
  listStreamItems: (multichain, stream) => {
    return new Promise((resolve, reject) => {
      multichain.listStreamItems({
        stream: stream.name,
        count: 100,
      }, (err, res) => {
        err ? reject(err) : resolve(res);
      })
    })
  },
  subscribe: (multichain, getStreamList, stream) => {
    return new Promise((resolve, reject) => {
      multichain.subscribe({
        stream: stream.name,
      }, (err, res) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(res);
        getStreamList()
      })
    })
  },
  unsubscribe: (multichain, getStreamList, stream) => {
    return new Promise((resolve, reject) => {
      multichain.unsubscribe({
        stream: stream.name,
      }, (err, res) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(res);
        getStreamList()
      })
    })
  },
  publish: (multichain, stream, keys, data) => {
    return new Promise((resolve, reject) => {
      multichain.publish({
        stream: stream.name,
        key: keys,
        data: { json: data }
      },
        (err, res) => {
          err ? reject(err) : resolve(res);
        })
    })
  },
}
