//
//
import { app, BrowserWindow, Menu } from 'electron';
import path from 'path';
import * as ipcMain from './ipcMain';

let mainWindow = null;
let forceQuit = false;

const isDevelopment = process.env.NODE_ENV === 'development';

module.exports = (iconpath) => {
    //
    // *********** WINDOW BEHAVIOUR **************
    //
    mainWindow = new BrowserWindow({
        fullscreen: false,
        // resizable: false,
        show: false,
        frame: false,
        hasShadow: true,
        webPreferences: {
            nodeIntegration: true,
            backgroundThrottling: false            
        },
        icon: iconpath   
    });

    mainWindow.loadFile(path.resolve(path.join(__dirname, '../renderer/index.html')));

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
        if (isDevelopment) {
            // auto-open dev tools
            mainWindow.webContents.openDevTools();   
        }
    });

    // Context menu
    if (isDevelopment) {       
        // add inspect element on right click menu
        mainWindow.webContents.on('context-menu', (e, props) => {
            Menu.buildFromTemplate([
                {
                    label: 'Inspect element',
                    click() {
                        mainWindow.inspectElement(props.x, props.y);
                    },
                },
            ]).popup(mainWindow);
        });
    }

    // *************  IPC  *****************
    // 
    // Show title in windowbar
    ipcMain.show_Window_Title(mainWindow);
    // Resizes browseer window
    ipcMain.browserWindows.setupWindow(mainWindow);
    ipcMain.browserWindows.homeWindow(mainWindow);
    // Control window visibility
    ipcMain.windowControl(mainWindow);
    // Test message from tray
    ipcMain.receive_message_from_tray(mainWindow);
    // Handle multichain ipc  
    ipcMain.download_lastest_multichain(mainWindow);
    ipcMain.handle_Multichain_config(mainWindow);
}
