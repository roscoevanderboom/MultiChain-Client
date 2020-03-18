const { Tray, Menu, app } = require('electron');

class AppTray extends Tray {
    constructor(iconPath, mainWindow) {
        super(iconPath);
        this.mainWindow = mainWindow;        
        this.on('click', this.onClick.bind(this));
        this.on('right-click', this.onRightClick.bind(this))
    }

    onClick(e, bounds) {  
        let { x, y } = bounds;
        const { height, width } = this.mainWindow.getBounds();

        x = parseInt(x - (width / 1.5));
        y = process.platform === 'darwin' ? y : parseInt(y - height),      

        this.mainWindow.setBounds({ x, y, width, height })
        this.mainWindow.isVisible() ? this.mainWindow.hide() : this.mainWindow.show();
    }

    onRightClick() {
        const menuConfig = Menu.buildFromTemplate([

            {
                label: 'Quit',
                click: () => app.quit(),
            }
        ]);
        this.popUpContextMenu(menuConfig);
    }
}


module.exports = AppTray;