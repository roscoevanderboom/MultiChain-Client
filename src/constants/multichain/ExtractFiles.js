const extract = require('extract-zip');
const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');

const winExtract = (resourcesPath, mainWindow) => {
    fs.readdir(resourcesPath, (err, res) => {
        if (err) throw err;
        res.forEach(async (file) => {
            if (file.includes('.zip')) {
                let source = path.join(resourcesPath, file);
                let target = path.join(resourcesPath, 'multichain');

                try {
                    await extract(source, { dir: target })
                    mainWindow.webContents.send('unzip:complete', target);
                } catch (err) {
                    mainWindow.webContents.send('unzip:error', err);
                }
            }
        })
    })
}

const linuxExtract = (file_path, mainWindow) => {
    exec(`tar -xvzf ${file_path}`, (err, stdout) => {
        if (err) throw err;
        console.log(stdout);
        mainWindow.webContents.send('unzip:complete');
    })
}

const extractFiles = (zipFile, mainWindow) => {
    mainWindow.webContents.send('unzip:begin');
    let resourcesPath = path.join(process.resourcesPath);
    let file_path = path.join(resourcesPath, zipFile);

    switch (process.platform) {
        case
            'win32':
            winExtract(resourcesPath, mainWindow);
            break;
        default:
            linuxExtract(file_path, mainWindow);
            break;
    }
}

module.exports = extractFiles