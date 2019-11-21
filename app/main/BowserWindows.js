//
//
import { app, BrowserWindow, ipcMain, shell } from 'electron';
import path from 'path';
import contextMenu from './ContextMenu';
import Chainpaths from '../renderer/multichain/Chainpaths';
import { createChain } from '../renderer/multichain/Daemons';

let mainWindow = null;
let forceQuit = false;

module.exports = () => {
  //
  // *********** WINDOW BEHAVIOUR **************
  //
  mainWindow = new BrowserWindow({
    fullscreen: false,
    height: 1000,
    width: 1600,
    minWidth: 640,
    minHeight: 480,
    show: false,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      backgroundThrottling: false
    }
  });

  mainWindow.loadFile(path.resolve(path.join(__dirname, '../renderer/index.html')));

  // add inspect element on right click menu
  mainWindow.webContents.on('context-menu', (e) => {
    contextMenu(e, mainWindow);
  });

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
            break;
          case 'preset':
            success();
            console.log('Apply presets to params.dat')
            break;
          default:
            success();
            shell.openItem(path.join(Chainpaths, chainName, 'params.dat'));
            break;
        }
      })
      .catch(err => fail(err));
  });
}
