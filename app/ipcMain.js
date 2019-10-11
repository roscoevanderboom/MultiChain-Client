const { shell } = require('electron');
const Chainpaths = require('../multichain/Chainpaths');
const LocalChains = require('../multichain/LocalChains');
const { getInfo, } = require('../multichain/MultichainFunctions');
const { startMultichain, stopMultichain, createChain } = require('../multichain/Daemons');

module.exports = {
  IPC_MAIN_ON: (ipcMain, window, channel) => {
    ipcMain.on(channel, (e, data) => {
      switch (channel) {
        case 'localChains:get':
          LocalChains()
            .then(chains => window.webContents.send('localChains:send', chains))
            .catch(chains => window.webContents.send('localChains:send', chains));
          break;
        case 'multichain-cli:getinfo':
          getInfo(data)
            .then(res => window.webContents.send('getinfo:success', res))
            .catch(err => window.webContents.send('getinfo:fail', err.message));
          break;
        case 'multichaind:daemon':
          startMultichain(data)
            .then(res => window.webContents.send('daemon:success', 'Start success'))
            .catch(err => window.webContents.send('daemon:fail', err));
          break;
        case 'multichain-cli:stop':
          stopMultichain(data)
            .then(res => mainWindow.webContents.send('stop-chain:success', res))
            .catch(err => mainWindow.webContents.send('stop-chain:fail', err.message))
          break;
        case 'multichain-util:create':
          const { chainName, option } = data;
          const success = () => { window.webContents.send('create-chain:success', `${chainName} created`) };
          const fail = (err) => { window.webContents.send('create-chain:fail', err.message) };

          createChain(chainName)
            .then(() => {
              switch (option) {
                case 'generic':
                  success();
                  loadChains();
                  break;
                case 'preset':
                  success();
                  console.log('Apply presets to params.dat')
                  loadChains();
                  break;
                default:
                  success();
                  shell.openItem(path.join(Chainpaths, chainName, 'params.dat'));
                  loadChains();
                  break;
              }
            })
            .catch(err => fail(err));
          break;
        default:
          break;
      }
    });
  }
}
