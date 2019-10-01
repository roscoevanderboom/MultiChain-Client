//
import { app, crashReporter } from 'electron';

import main from './BowserWindows';
import LocalChains from './multichain/LocalChains';
import { stopMultichain } from './multichain/Daemons';

let mainWindow = null;
const isDevelopment = process.env.NODE_ENV === 'development';

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
  productName: 'Multichain Manager',
  companyName: 'Grentrac',
  submitURL: 'https://your-domain.com/url-to-submit',
  uploadToServer: false,
});


app.on('ready', async () => {
  // if (isDevelopment) {
  //   await installExtensions();
  // }
  mainWindow = main(isDevelopment);
});


app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('quit', () => {
  LocalChains()
    .then(chains => {
      chains.forEach(chain => stopMultichain(chain))
    })
    .catch(()=> {
      console.log('no chains')
    })
})
