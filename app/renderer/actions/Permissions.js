//
//
module.exports = {
  listPermissions: (multichain) => {
    return new Promise((resolve, reject) => {
      multichain.listPermissions((err, res) => {
        err ? reject(err) : resolve(res);
      });
    })
  },
}
