//
//
export default (multichain, setStreamList) => {
  multichain.listStreams((err, res) => {
    if (err) {
      console.log(err);
      return;
    }
    let streamList = [];

    res.forEach(stream => {
      streamList.push([stream.name, stream.subscribed, stream.details])
    });
    setStreamList(streamList);
  });
}
