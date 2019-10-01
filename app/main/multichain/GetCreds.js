const fs = require('fs');
const path = require('path');
const chainpath = require('./Chainpaths');

const getCreds = (chain) => {
  return new Promise((resolve, reject) => {
    let creds = {
      port: '',
      host: '127.0.0.1',
      user: 'multichainrpc',
      pass: '',
      name: chain
    };
    var configFile = path.join(chainpath, chain, 'multichain.conf');
    fs.readFile(configFile, 'utf-8', (err, data) => {
      if (err) { reject(err) };
      let x = data.indexOf('rpcpassword=');
      let start = x + 12;
      let stop = start + 44;
      creds.pass = data.slice(start, stop);
    });

    // read params file to get rpc port
    var paramsFile = path.join(chainpath, chain, 'params.dat');
    fs.readFile(paramsFile, 'utf-8', (err, data) => {
      if (err) { reject(err) };
      let x = data.indexOf('default-rpc-port = ');
      let start = x + 19;
      let stop = start + 4;
      creds.port = data.slice(start, stop);
      resolve(creds);
    });
  })
}

module.exports = getCreds;
