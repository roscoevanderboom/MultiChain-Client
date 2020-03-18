const { BrowserWindow } = require('electron');
import path from 'path';

class TrayWindow extends BrowserWindow {
    constructor() {
        super({
            width: 350,
            height: 300,
            webPreferences: {
                nodeIntegration: true,
                backgroundThrottling: false
            },
            frame: false,
            resizable: true,
            show: false,
            alwaysOnTop: true
        });
        this.loadFile(path.resolve(path.join(__dirname, '../renderer/tray.html')))
        this.webContents.openDevTools();   
    }   
}

module.exports = TrayWindow;