//
//
const { app, BrowserWindow, ipcMain, shell } = require('electron');
const path = require('path');
const url = require('url');
const contextMenu = require('./ContextMenu');
const LocalChains = require('../multichain/LocalChains');
const GetCreds = require('../multichain/GetCreds');
const Chainpaths = require('../multichain/Chainpaths');
const { startMultichain, stopMultichain, createChain } = require('../multichain/Daemons');
const { subscribe } = require('../multichain/MultichainFunctions');

let mainWindow = null;
let forceQuit = false;

module.exports = (dev) => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    fullscreen: true,
    minWidth: 1200,
    minHeight: 800,
    show: false,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      backgroundThrottling: false
    }
  });

  // *********** WINDOW BEHAVIOUR **************
  //
  // show window once on first load
  mainWindow.webContents.once('did-finish-load', () => {
    mainWindow.show();
  });
  // Handle window logic properly on macOS:
  // 1. App should not terminate if window has been closed
  // 2. Click on icon in dock should re-open the window
  // 3. ⌘+Q should close the window and quit the app
  mainWindow.webContents.on('did-finish-load', () => {
    if (process.platform === 'darwin') {
      mainWindow.on('close', function (e) {
        if (!forceQuit) {
          e.preventDefault();
          mainWindow.hide();
        }
      });
      app.on('activate', () => {
        mainWindow.show();
      });
      app.on('before-quit', () => {
        forceQuit = true;
      });
    } else {
      mainWindow.on('closed', () => {
        mainWindow = null;
      });
    }
  });

  // and load the index.html of the app.
  let indexPath

  if (dev && process.argv.indexOf('--noDevServer') === -1) {
    indexPath = url.format({
      protocol: 'http:',
      host: 'localhost:8080',
      pathname: 'index.html',
      slashes: true
    })
  } else {
    indexPath = url.format({
      protocol: 'file:',
      pathname: path.join(__dirname, 'dist', 'index.html'),
      slashes: true
    })
  }

  mainWindow.loadURL(indexPath);

  const loadChains = () => {
    LocalChains()
      .then(chains => mainWindow.webContents.send('localChains:send', chains))
      .catch(chains => mainWindow.webContents.send('localChains:send', chains));
  }
  //
  // *********** IPC **************
  //
  // Get current chain list on window load
  mainWindow.webContents.on('did-finish-load', () => {
    loadChains();
  });
  // Request to get local chain list
  mainWindow.webContents.on('localChains:get', () => {
    loadChains();
  });
  // Request to start a chain
  ipcMain.on('chain:start', (e, selectedChain) => {
    startMultichain(selectedChain)
      .then(res => {
        console.log('Start success');
        mainWindow.webContents.send('chain-start:success', 'Start success');
      })
      .catch(err => {
        mainWindow.webContents.send('chain-start:fail', err);
      });
  });
  // Request to stop a chain
  ipcMain.on('chain:stop', (e, selectedChain) => {
    stopMultichain(selectedChain)
      .then(res => mainWindow.webContents.send('chain-stop:success', res))
      .catch(err => mainWindow.webContents.send('chain-stop:fail', err.message))
  });
  // Request to get credantials for a chain
  ipcMain.on('chain:connect', (e, chain) => {
    GetCreds(chain)
      .then(creds => mainWindow.webContents.send('chain-connect:success', creds))
      .catch(err => mainWindow.webContents.send('chain-connect:fail', 'That chain does not exist'));
  });
  // Request to create a new chain
  ipcMain.on('chain:create', (e, data) => {
    const { chainName, option } = data;
    const success = () => { mainWindow.webContents.send('chain-create:success', `${chainName} created`) };
    const fail = (err) => { mainWindow.webContents.send('chain-create:fail', err.message) };

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
  });
  // Request to get credantials for a chain
  ipcMain.on('asset:subscribe', (e, data) => {
    const { activeChain, asset } = data;
    subscribe(activeChain, asset)
      .then(res => {
        console.log(res)
        mainWindow.webContents.send('subscribe:success', res)
      })
      .catch(err => {
        console.log(err)
        mainWindow.webContents.send('subscribe:fail', err)
      });
  });
  //
}
