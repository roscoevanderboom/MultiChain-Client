//
import { app } from 'electron';
import path from 'path';
import appWindow from './BowserWindows';
import LocalChains from '../renderer/constants/multichain/LocalChains';
import { stopMultichain } from '../renderer/constants/multichain/Daemons';
import { trayControl, show_Window_Title } from './ipcMain';
import TrayWindow from './TrayWindow';
import Tray from './Tray';

const iconPath = path.join(__dirname, 'icon.jpg');

let mainWindow = null;
let trayWindow = null;
let tray = null;

app.on('ready', () => {

  mainWindow = appWindow();

  trayWindow = new TrayWindow();
  tray = new Tray(iconPath, trayWindow)
  trayControl(trayWindow);
  show_Window_Title(trayWindow);

});

app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
app.allowRendererProcessReuse = true;
app.on('will-quit', () => {
  LocalChains()
    .then(chains => {
      chains.forEach(chain => stopMultichain(chain))
    })
    .catch(() => {
      console.log('no chains')
    })
})
