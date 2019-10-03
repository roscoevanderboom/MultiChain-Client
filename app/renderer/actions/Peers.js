//
//
export default (multichain, setState) => {
  multichain.getPeerInfo((err, res) => {
    if (err) {
      console.log(err);
      return;
    }
    setState(res);
  });
}
