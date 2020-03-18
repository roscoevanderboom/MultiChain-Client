
import { app, crashReporter } from 'electron';
import path from 'path';
import BrowserWindow from './mainWindow';
import TrayWindow from './TrayWindow';
import Tray from './Tray';

const isDevelopment = process.env.NODE_ENV === 'development';
const iconPath = path.join(__dirname, 'icon.jpg');

let mainWindow = null;
let trayWindow = null;
let tray = null;

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  for (const name of extensions) {
    try {
      await installer.default(installer[name], forceDownload);
    } catch (e) {
      console.log(`Error installing ${name} extension: ${e.message}`);
    }
  }
};

crashReporter.start({
  productName: 'YourName',
  companyName: 'YourCompany',
  submitURL: 'https://your-domain.com/url-to-submit',
  uploadToServer: false,
});

app.allowRendererProcessReuse = true

app.on('ready', async () => {
  if (isDevelopment) {
    await installExtensions();
  }

  mainWindow = BrowserWindow(iconPath);
  trayWindow = new TrayWindow();
  tray = new Tray(iconPath,trayWindow)

});
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
// Events prior to quitting app
app.on('before-quit', async () => {
  console.log('App before quit');
});
app.on('will-quit', async () => {
  console.log('App will quit');
});
app.on('quit', async () => {
  console.log('App quit');
});
