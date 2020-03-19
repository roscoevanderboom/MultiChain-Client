import { ipcMain, app } from 'electron';
import path from 'path';
import { readdir } from 'fs';
import extract from 'extract-zip';
import { download } from 'electron-dl';
import download_url from '../renderer/constants/multichain/Download-URLS';
import binary_filenames from '../renderer/constants/multichain/BinaryFileNames';
import chainpaths from '../renderer/constants/multichain/Chainpaths';

export const browserWindows = {
    setupWindow: (mainWindow) => {
        ipcMain.on('window:setupWindow', () => {
            mainWindow.setBounds({ width: 600, height: 400 });
        });
    },
    homeWindow: (mainWindow) => {
        ipcMain.on('window:homeWindow', () => {
            mainWindow.setSize(1200, 800)
        });
    }
}
export const show_Window_Title = (mainWindow) => {
    ipcMain.on('window:get-Title', () => {
        let title = mainWindow.getTitle();
        mainWindow.send('window:send-Title', title);
    });

}
export const receive_message_from_tray = (mainWindow) => {
    ipcMain.on('tray:message', (e, message) => {
        mainWindow.send('mainWindow:message', message);
    });
}
export const windowControl = (mainWindow) => {
    ipcMain.on('windowControl', (e, action) => {
        console.log(action);

        switch (action) {
            case 'minimize':
                mainWindow.minimize();
                break;
            default:
                app.quit();
                break;
        }
    });
}
export const trayControl = (mainWindow) => {
    ipcMain.on('trayControl', () => {
        mainWindow.hide();
    });
}
export const download_lastest_multichain = (mainWindow) => {
    ipcMain.on('download:confirmed', () => {
        console.log('confirm');
        readdir(process.resourcesPath, (err, res) => {
            let zipFile = download_url.slice(download_url.indexOf('download/') + 9);
            let ipfsFile = 'QmUH4ykeQhEAtapxnaE792F4hiAYsrRrCGpXJuc1nHE6Vy.zip';
            if (res.includes(zipFile) || res.includes(ipfsFile)) {
                mainWindow.webContents.send('download:complete');
                extract_source_files(mainWindow)
                return;
            }
            download(mainWindow, download_url, {
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
}
const extract_source_files = (mainWindow) => {
    mainWindow.webContents.send('unzip:begin');
    readdir(process.resourcesPath, (err, res) => {
        res.map(file => {
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
}
export const handle_Multichain_config = (mainWindow) => {
    ipcMain.on('multichain:tray', (e, multichain) => {
        mainWindow.send('multichain:mainWindow', multichain);
    })
}

