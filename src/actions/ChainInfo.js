//
//
export default (multichain, setKeys, setValues) => {
  multichain.getInfo((err, res) => {
    if (err) {
      return;
    }
    setKeys(Object.keys(res));
    setValues(Object.values(res));
  });
}
