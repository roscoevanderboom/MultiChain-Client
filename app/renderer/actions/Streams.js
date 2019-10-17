//
//
module.exports = {
  createStream: (multichain, options) => {
    const { name, isOpen, details } = options;
    return new Promise((resolve, reject) => {
      multichain.create({
        type: 'stream',
        name: name,
        open: isOpen,
        details: {
          text: details
        }
      }, (err, res) => {
        err ? reject(err) : resolve(res);
      })
    })
  },
  listStreams: (multichain) => {
    return new Promise((resolve, reject) => {
      multichain.listStreams((err, res) => {
        err ? reject(err) : resolve(res);
      });
    })
  },
  listStreamItems: (multichain, stream) => {
    return new Promise((resolve, reject) => {
      multichain.listStreamItems({
        stream: stream.name,
        count: 100,
      }, (err, res) => {
        err ? reject(err) : resolve(res);
      })
    })
  },
  subscribe: (multichain, getStreamList, stream) => {
    return new Promise((resolve, reject) => {
      multichain.subscribe({
        stream: stream.name,
      }, (err, res) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(res);
        getStreamList()
      })
    })
  },
  unsubscribe: (multichain, getStreamList, stream) => {
    return new Promise((resolve, reject) => {
      multichain.unsubscribe({
        stream: stream.name,
      }, (err, res) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(res);
        getStreamList()
      })
    })
  },
  publish: (multichain, stream, data) => {
    return new Promise((resolve, reject) => {
      multichain.publish({
        stream: stream.name,
        key: stream.name,
        data: { json: data }
      },
        (err, res) => {
          err ? reject(err) : resolve(res);
        })
    })
  },
}
