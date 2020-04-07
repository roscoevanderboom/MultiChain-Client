const electron = require('electron');
const { app, BrowserWindow, ipcMain } = electron;
const path = require('path');
const isDev = require('electron-is-dev');

let mainWindow;
let forceQuit = false;

const iconPath = path.join(__dirname, '../icon.png');

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 900,
        height: 680,
        show: false,
        frame: true,
        hasShadow: true,
        center: true,
        icon: iconPath,
        webPreferences:{
            webviewTag: true,
            nodeIntegration: false,
            allowRunningInsecureContent: false,
            scrollBounce: true
        }
    });
    mainWindow.loadURL(isDev ? `file://${path.join(__dirname,'../browserWindow.html')}` : `file://${path.join(__dirname, '../../build/browserWindow.html')}`);

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

            app.on('before-quit', () => {
                forceQuit = true;
            });
        } else {
            mainWindow.on('closed', () => {
                mainWindow = null;
            });
        }
        if (isDev) {
            // Open the DevTools.        
            // mainWindow.webContents.openDevTools();
        }
    });

    ipcMain.on('browser:open', () => {
        mainWindow.show();
    })
}

module.exports = createWindow;