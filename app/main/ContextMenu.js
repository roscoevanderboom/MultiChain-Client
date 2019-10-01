const { Menu } = require('electron');


module.exports = (mainWindow) => {
    Menu.buildFromTemplate([
        {
            label: 'Inspect element',
            click() {
                mainWindow.inspectElement(props.x, props.y);
            },
        },
    ]).popup(mainWindow);
}
