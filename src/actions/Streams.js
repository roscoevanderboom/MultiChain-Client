//
//
export default (multichain, setStreamList) => {
  multichain.listStreams((err, res) => {
    if (err) {
      return;
    }
    setStreamList(res);
  });
}
