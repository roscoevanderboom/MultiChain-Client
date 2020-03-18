const { BrowserWindow } = require('electron');
import path from 'path';

class TrayWindow extends BrowserWindow {
    constructor() {
        super({
            width: 300,
            height: 300,
            webPreferences: {
                nodeIntegration: true,
                backgroundThrottling: false
            },
            frame: false,
            resizable: false,
            show: false,
            alwaysOnTop: false
        });
        this.loadFile(path.resolve(path.join(__dirname, '../renderer/tray.html')))
       
    }   
}

module.exports = TrayWindow;