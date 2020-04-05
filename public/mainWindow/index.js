const electron = require('electron');
const { app, BrowserWindow } = electron;
const path = require('path');
const isDev = require('electron-is-dev');
const IPC = require('../ipc');

let mainWindow;
let forceQuit = false;

const iconPath = path.join(__dirname, '../icon.png');

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 900,
        height: 680,
        show: false,
        frame: false,
        hasShadow: true,
        center: true,
        icon: iconPath,
        webPreferences: {
            nodeIntegration: true,
            backgroundThrottling: false
        }
    });
    mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../../build/index.html')}`);

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
        if (isDev) {
            // Open the DevTools.        
            // mainWindow.webContents.openDevTools();
        }
    });


    // IPC
    IPC.greet(mainWindow);
    // Show title in windowbar
    IPC.show_Window_Title(mainWindow);
    // Resizes browseer window
    IPC.browserWindows.setupWindow(mainWindow);
    IPC.browserWindows.homeWindow(mainWindow);
    // Control window visibility
    IPC.control_window(mainWindow);
    // Handle multichain ipc  
    IPC.download_lastest_multichain(mainWindow);
    IPC.handle_Multichain_config(mainWindow);
}

module.exports = createWindow;