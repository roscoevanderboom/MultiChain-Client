//
import { app } from 'electron';

import appWindow from './BowserWindows';
import LocalChains from '../../multichain/LocalChains';
import { stopMultichain } from '../../multichain/Daemons';

const isDevelopment = process.env.NODE_ENV === 'development';

app.on('ready', appWindow);

app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('will-quit', () => {
  LocalChains()
    .then(chains => {
      chains.forEach(chain => stopMultichain(chain))
    })
    .catch(()=> {
      console.log('no chains')
    })
})
