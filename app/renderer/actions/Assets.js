//
//
export default (multichain, setState) => {
  multichain.listAssets((err, res) => {
    if (err) {
      console.log(err);
      return;
    }
    setState(res);
  });
}
