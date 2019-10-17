//
//
module.exports = {
  listAssets: (multichain) => {
    return new Promise((resolve, reject) => {
      multichain.listAssets((err, res) => {
        err ? reject(err) : resolve(res);
      });
    })
  },
  issue: (multichain, assetDetails) => {
    const { address, name, details, quantity } = assetDetails;
    return new Promise((resolve, reject) => {
      multichain.issue({
        address: address,
        asset: name,
        qty: Number(quantity),
        details: {
          text: details
        }
      }, (err, res) => {
        err ? reject(err) : resolve(res);
      });
    })
  },
}

