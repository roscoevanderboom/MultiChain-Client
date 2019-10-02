//
//
export default (multichain, setState) => {
  multichain.listAddresses((err, res) => {
    if (err) {
      console.log(err);
      return;
    }
    setState(res);
  });
}
