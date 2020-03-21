//
//
import { app, BrowserWindow, ipcMain, shell } from 'electron';
import path from 'path';
import { readdir } from 'fs';
import extract from 'extract-zip';
import { download } from 'electron-dl';
import download_url from '../renderer/constants/multichain/Download-URLS'
import contextMenu from './ContextMenu';
import Chainpaths from '../renderer/constants/multichain/Chainpaths';
import { createChain } from '../renderer/constants/multichain/Daemons';

const isDevelopment = process.env.NODE_ENV === 'development';

let mainWindow = null;
let forceQuit = false;

module.exports = () => {
  //
  // *********** WINDOW BEHAVIOUR **************
  //
  mainWindow = new BrowserWindow({
    fullscreen: true,
    height: 1000,
    width: 1600,
    minWidth: 640,
    minHeight: 480,
    show: false,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      backgroundThrottling: false
    },
    icon: path.join(__dirname, 'icon.jpg'),
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
    if (isDevelopment) {
      // auto-open dev tools
      mainWindow.webContents.openDevTools();
    }
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

  // *************  IPC  *****************

  ipcMain.on('multichain:tray', (e, multichain) => {
    mainWindow.send('multichain:mainWindow', multichain);
  })

  ipcMain.on('download', () => {
    readdir(process.resourcesPath, (err, res) => {
      let zipFile = download_url.slice(download_url.indexOf('download/') + 9)
      let ipfsFile = 'QmUH4ykeQhEAtapxnaE792F4hiAYsrRrCGpXJuc1nHE6Vy.zip'
      if (res.includes(zipFile) || res.includes(ipfsFile)) {
        mainWindow.webContents.send('download:progress', '1');
        return;
      }
      mainWindow.webContents.send('download:start');
      download(mainWindow, download_url, {
        directory: process.resourcesPath,
        onProgress: (progress) => {
          mainWindow.webContents.send('download:progress', progress);
        },
      });
    })
  })

  ipcMain.on('download:complete', (e, isComplete) => {
    if (isComplete) {
      mainWindow.webContents.send('unzip:begin', 'Unzip source files');
      readdir(process.resourcesPath, (err, res) => {
        res.map(file => {
          if (file.includes('.zip') || file.includes('.gz')) {
            let source = path.join(process.resourcesPath, file);
            let target = path.join(process.resourcesPath, 'multichain');
            extract(source, { dir: target }, function (err) {
              if (err) {
                console.log(err)
                return;
              }
              mainWindow.webContents.send('unzip:complete', 'Unzip complete');
            })
          }
        })
      })
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
