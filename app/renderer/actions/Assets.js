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
  issue: (multichain, assetDetails, json) => {
    const { address, name, quantity } = assetDetails;
    return new Promise((resolve, reject) => {
      multichain.issue({
        address: address,
        asset: name,
        qty: Number(quantity),
        details: {
          json: json
        }
      }, (err, res) => {
        err ? reject(err) : resolve(res);
      });
    })
  },
}

