//
//
module.exports = {
  listAddresses: (multichain) => {
    return new Promise((resolve, reject) => {
      multichain.listAddresses((err, res) => {
        err ? reject(err) : resolve(res);
      });
    })
  },
  getNewAddress: (multichain) => {
    return new Promise((resolve, reject) => {
      if (!(multichain)) {
        reject('You are not connected');
        return;
      }
      multichain.getNewAddress((err, res) => {
        err ? reject(err) : resolve(res);
      });
    })
  },
}
