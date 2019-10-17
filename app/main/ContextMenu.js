const { Menu } = require('electron');
const appWindow = require('./BowserWindows');

function name(e) {
  console.log(e)
}


module.exports = (e, mainWindow) => {
  Menu.buildFromTemplate([
    {
      label: 'Inspect element',
      click() {
        appWindow();
      },
    },
  ]).popup(mainWindow);
}
