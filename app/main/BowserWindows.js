//
//
import { app, BrowserWindow, ipcMain, shell } from 'electron';
import path from 'path';
import contextMenu from './ContextMenu';
import LocalChains from '../../multichain/LocalChains';
import GetCreds from '../../multichain/GetCreds';
import Chainpaths from '../../multichain/Chainpaths';
import { startMultichain, stopMultichain, createChain } from '../../multichain/Daemons';

console.log(startMultichain)

let mainWindow = null;
let forceQuit = false;

module.exports = (isDevelopment) => {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
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
      .then(chains => mainWindow.webContents.send('localChains', chains))
      .catch(chains => mainWindow.webContents.send('localChains', chains));
  }

  // Get current chain list on window load
  // && Start all chains
  mainWindow.webContents.on('did-finish-load', () => {
    loadChains();
  });


  // Request to start a chain
  ipcMain.on('chain:start', (e, selectedChain) => {
    LocalChains()
      .then(chains => {
        chains.forEach(chain => {
          if (chain === selectedChain) {
            startMultichain(chain)
              .catch(err => {
                console.log(err)
                mainWindow.webContents.send('chain-start:fail', err.message)})
          }
        });
      })
      .catch(chains => mainWindow.webContents.send('localChains', chains));
  });
  // Request to stop a chain
  ipcMain.on('chain:stop', (e, selectedChain) => {
    LocalChains()
      .then(chains => {
        chains.forEach(chain => {
          if (chain === selectedChain) {
            stopMultichain(chain)
              .then(res => mainWindow.webContents.send('chain-stop:success', `${selectedChain} stopped`))
              .catch(err => mainWindow.webContents.send('chain-stop:fail', `${selectedChain} is not running`))
          }
        });
      })
      .catch(chains => mainWindow.webContents.send('localChains', chains));
  });
  // Request to get credantials for a chain
  ipcMain.on('chain:connect', (e, chain) => {
    GetCreds(chain)
      .then(creds => mainWindow.webContents.send('chain-connect:success', creds))
      .catch(err => mainWindow.webContents.send('chain-connect:fail', 'Falied to connect'));
  });
  // Request to create a new chain
  ipcMain.on('chain:create-generic', (e, chainName) => {
    console.log(`Create ${chainName}`);
    createChain(chainName)
      .then(() => {
        mainWindow.webContents.send('chain-create:success', `${chainName} created`);
        loadChains();
      })
      .catch(err => mainWindow.webContents.send('chain-create:fail', err.message))
  });
  // Request to open params.dat for custom chain
  ipcMain.on('chain:create-custom', (e, chainName) => {
    createChain(chainName)
      .then(() => {
        mainWindow.webContents.send('chain-create:success', `${chainName} created`);
        shell.openItem(path.join(Chainpaths, chainName, 'params.dat'));
        loadChains();
      })
      .catch(err => mainWindow.webContents.send('chain-create:fail', err.message))
  })
  // Request to load preset configs to params.dat
  ipcMain.on('chain:create-preset', (e, chainName) => {
    createChain(chainName)
      .then(() => {
        mainWindow.webContents.send('chain-create:success', `${chainName} created`);
        console.log('Apply presets to params.dat')
        loadChains();
      })
      .catch(err => mainWindow.webContents.send('chain-create:fail', err.message))

  })



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
