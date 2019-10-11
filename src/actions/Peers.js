//
//
export default (multichain, setState) => {
  multichain.getPeerInfo((err, res) => {
    if (err) {
      return;
    }
    setState(res);
  });
}
