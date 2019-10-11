//
//
export default (multichain, setState) => {
  multichain.listAddresses((err, res) => {
    if (err) {
      return;
    }
    setState(res);
  });
}
