//
//
export default (multichain, setState) => {
  multichain.listPermissions((err, res) => {
    if (err) {
      return;
    }
    setState(res);
  });
}
