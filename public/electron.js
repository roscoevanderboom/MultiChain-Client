const electron = require('electron');
const { app, BrowserWindow, ipcMain } = electron;
const mainWindow = require('./mainWindow');
const webBrowser = require('./browserWindow');

app.allowRendererProcessReuse = true;

app.whenReady()
    .then(() => {
        mainWindow();
        webBrowser()
    });

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) mainWindow()
})
