const electron = require('electron');
const { ipcMain, app } = electron;
const path = require('path');
const { readdir } = require('fs');
const extract = require('extract-zip');
const { download } = require('electron-dl');
const binary_filenames = require('../../src/constants/multichain/BinaryFileNames');
const chainpaths = require('../../src/constants/multichain/Chainpaths');

const greet = () => {
    ipcMain.handle('greet', async () => {
        return 'Hello from Main process';
    });
};
const browserWindows = {
    setupWindow: (mainWindow) => {
        ipcMain.on('window:setupWindow', () => {
            mainWindow.setBounds({ width: 900, height: 600 });
        });
    },
    homeWindow: (mainWindow) => {
        ipcMain.on('window:homeWindow', () => {
            mainWindow.setSize(1200, 800)
        });
    }
}
const show_Window_Title = (mainWindow) => {
    ipcMain.handle('window:get-Title', async () => {
        let title = mainWindow.getTitle();
        return title;
    })
};
const control_window = (mainWindow) => {
    ipcMain.on('control-window', (e, action) => {
        switch (action) {
            case 'minimize':
                mainWindow.minimize();
                break;
            case 'maximize':
                if (mainWindow.isMaximized()) {
                    mainWindow.setBounds({ x: 440, y: 225, width: 900, height: 600 });
                    return;
                }
                mainWindow.maximize();
                break;
            case 'close':
                app.quit();
                break;
            default:
                break;
        }
    });
};
const download_lastest_multichain = (mainWindow) => {
    ipcMain.on('download:confirmed', (e,url) => {
        console.log('confirm download');
        readdir(process.resourcesPath, (err, res) => {
            let zipFile = url.slice(url.indexOf('download/') + 9);
            let ipfsFile = 'QmUH4ykeQhEAtapxnaE792F4hiAYsrRrCGpXJuc1nHE6Vy.zip';
            if (res.includes(zipFile) || res.includes(ipfsFile)) {
                mainWindow.webContents.send('download:complete');
                extract_source_files(mainWindow)
                return;
            }
            download(mainWindow, url, {
                directory: process.resourcesPath,
                onProgress: (progress) => {
                    if (progress.percent === 1) {
                        mainWindow.webContents.send('download:complete');
                        extract_source_files(mainWindow)
                        return;
                    }
                    mainWindow.webContents.send('download:progress', progress.percent);
                },
            });
        })
    })
};
const extract_source_files = (mainWindow) => {
    mainWindow.webContents.send('unzip:begin');
    readdir(process.resourcesPath, (err, res) => {
        res.forEach(file => {
            if (file === binary_filenames) {
                let source = path.join(process.resourcesPath, file);
                let target = path.join(process.resourcesPath, 'multichain');
                extract(source, { dir: target }, function (err) {
                    if (err) {
                        mainWindow.webContents.send('unzip:error', err);
                        return;
                    }
                    mainWindow.webContents.send('unzip:complete', { chainpaths, target });
                })
            }
        })
    })
};
const handle_Multichain_config = (mainWindow) => {
    ipcMain.on('multichain:tray', (e, multichain) => {
        console.log(multichain)
        mainWindow.send('multichain:mainWindow', multichain);
    })
};

module.exports = {
    greet, show_Window_Title, control_window, browserWindows,
    download_lastest_multichain, handle_Multichain_config
}