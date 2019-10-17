//
//
module.exports = {
  getPeerInfo: (multichain) => {
    return new Promise((resolve, reject) => {
      multichain.getPeerInfo((err, res) => {
        err ? reject(err) : resolve(res);
      });
    })
  },
}
