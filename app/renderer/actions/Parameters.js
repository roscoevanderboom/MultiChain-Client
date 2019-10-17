//
//
module.exports = {
  blockchainParams: (multichain) => {
    return new Promise((resolve, reject) => {
      multichain.getBlockchainParams((err, res) => {
        err ? reject(err) : resolve(res);
      });
    })
  },
}

