//
//
export default (multichain, setState) => {
  multichain.getBlockchainParams((err, res) => {
    if (err) {
      return;
    }
    setState(res);
  });
}
