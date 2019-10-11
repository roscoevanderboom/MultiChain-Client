'use strict'

// Import parts of electron to use
const { app } = require('electron');
const LocalChains = require('./multichain/LocalChains');
const { stopMultichain} = require('./multichain/Daemons');

const appWindow = require('./app/appWindow');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

// Keep a reference for dev mode
let dev = false

if (process.defaultApp || /[\\/]electron-prebuilt[\\/]/.test(process.execPath) || /[\\/]electron[\\/]/.test(process.execPath)) {
  dev = true
}

// Temporary fix broken high-dpi scale factor on Windows (125% scaling)
// info: https://github.com/electron/electron/issues/9691
if (process.platform === 'win32') {
  app.commandLine.appendSwitch('high-dpi-support', 'true')
  app.commandLine.appendSwitch('force-device-scale-factor', '1')
}

app.on('ready', () => {
  appWindow(dev);
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    appWindow(dev)
  }
})

app.on('will-quit', ()=> {
  LocalChains()
    .then(chains => {
      chains.forEach(chain => stopMultichain(chain))
    })
    .catch(() => {
      console.log('no chains')
    })
})

