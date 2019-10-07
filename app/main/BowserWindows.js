//
//
import { app, BrowserWindow, ipcMain, shell } from 'electron';
import path from 'path';
import contextMenu from './ContextMenu';
import LocalChains from '../../multichain/LocalChains';
import GetCreds from '../../multichain/GetCreds';
import Chainpaths from '../../multichain/Chainpaths';
import { startMultichain, stopMultichain, createChain } from '../../multichain/Daemons';
import { subscribe } from '../../multichain/MultichainFunctions';

let mainWindow = null;
let forceQuit = false;

module.exports = (isDevelopment) => {
  mainWindow = new BrowserWindow({
    fullscreen: true,
    minWidth: 640,
    minHeight: 480,
    show: false,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      backgroundThrottling: false
    }
  });

  const loadChains = () => {
    LocalChains()
      .then(chains => mainWindow.webContents.send('localChains:send', chains))
      .catch(chains => mainWindow.webContents.send('localChains:send', chains));
  }

  // Get current chain list on window load
  mainWindow.webContents.on('did-finish-load', () => {
    loadChains();
  });

  //
  // *********** IPC **************
  //

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
  // *********** WINDOW BEHAVIOUR **************
  //

  mainWindow.loadFile(path.resolve(path.join(__dirname, '../renderer/index.html')));

  if (isDevelopment) {
    // auto-open dev tools
    mainWindow.webContents.openDevTools();

    // add inspect element on right click menu
    mainWindow.webContents.on('context-menu', () => {
      contextMenu(mainWindow);
    });
  }

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
}
