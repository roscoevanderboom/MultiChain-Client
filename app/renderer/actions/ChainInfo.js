//
//
module.exports = {
  getInfo: (multichain) => {
    return new Promise((resolve, reject) => {
      multichain.getInfo((err, res) => {
        err ? reject(err) : resolve(res);
      });
    })
  },
}
