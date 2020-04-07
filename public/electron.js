const electron = require('electron');
const { app, BrowserWindow, ipcMain } = electron;
const mainWindow = require('./mainWindow');
const webBrowser = require('./browserWindow');

app.allowRendererProcessReuse = true;

let appWindow;
let browserWindow;

app.whenReady()
    .then(() => {
       appWindow = mainWindow();
       browserWindow = webBrowser();
    });

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});


ipcMain.on('browser:open', () => {
    webBrowser()    
})

app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) mainWindow()
})
