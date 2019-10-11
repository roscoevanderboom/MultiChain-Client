//
//
export default (multichain, setState) => {
  multichain.listAssets((err, res) => {
    if (err) {
      return;
    }
    setState(res);
  });
}
