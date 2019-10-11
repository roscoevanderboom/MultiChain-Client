const { Menu, app } = require('electron');


module.exports = (mainWindow) => {
    Menu.buildFromTemplate([
        {
            label: 'Relaunch app',
            click() {
                app.relaunch();
                app.quit();
            },
        },
    ]).popup(mainWindow);
}
