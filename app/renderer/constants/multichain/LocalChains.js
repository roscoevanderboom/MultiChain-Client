//
const fs = require('fs');
const chainpath = require('./Chainpaths')

module.exports = () => {
  return new Promise((resolve, reject) => {
    const localchains = [];
    fs.readdir(chainpath, (err, stat) => {
      if (err) {
        reject(localchains);
        return;
      }
      stat.forEach(val => {
        if (!(val.includes('.'))) {
          localchains.push(val)
        }
      });
      resolve(localchains);
    });
  })
}
