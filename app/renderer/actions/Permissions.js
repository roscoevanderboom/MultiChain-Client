//
//
export default (multichain, setState) => {
  multichain.listPermissions((err, res) => {
    if (err) {
      console.log(err);
      return;
    }
    setState(res);
  });
}
