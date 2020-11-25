import React, { useContext, useEffect, useState } from 'react';
import { ipcRenderer } from 'electron';
import { store } from '../../store';
// Multichain constants
import download_url from '../../constants/multichain/Download-URLS';
import chainpaths from '../../constants/multichain/Chainpaths';
// Components
import { Container, Typography } from '@material-ui/core';
import Button from '../CustomButtons/Button';
import { GoBack } from '../NavButtons';
// Styles
import useStyles from './styles';

const DownloadLatest = () => {
  const classes = useStyles();
  const { reducers } = useContext(store);

  const [progress, setProgress] = useState(0);
  const [current_action, setCurrent_action] = useState('Click confirm to start download');

  const handleConfirm = () => {
    ipcRenderer.send('download:confirmed', download_url);
  }

  useEffect(() => {
    ipcRenderer.on('download:progress', (e, data) => {
      setCurrent_action('Downloading...')
      setProgress((data * 100).toFixed(0));
    });

    ipcRenderer.on('download:complete', (e, zipFile) => {
      setProgress(100)
      setCurrent_action('Download complete');
      ipcRenderer.send('unzip:begin', zipFile);
    });

    ipcRenderer.on('unzip:begin', () => {
      setCurrent_action('Extracting files...');
    });

    ipcRenderer.on('unzip:complete', (e, binariesDir) => {
      localStorage.setItem("binariesPath", binariesDir);
      localStorage.setItem("blockchainsPath", chainpaths);
      setCurrent_action('Extraction complete');

      reducers.dispatch_multichain_state({
        type: 'SET_LOCAL_PATHS',
        data: { binariesPath: binariesDir, blockchainsPath: chainpaths }
      })
    });

    ipcRenderer.on('unzip:error', (e, error) => {
      setCurrent_action('Extraction error. Check console');
      console.log(error);
    });

    return () => {
      ipcRenderer.removeAllListeners('download:progress');
      ipcRenderer.removeAllListeners('download:complete');
      ipcRenderer.removeAllListeners('unzip:begin');
      ipcRenderer.removeAllListeners('unzip:complete');
      ipcRenderer.removeAllListeners('unzip:error');
    }
    // eslint-disable-next-line
  }, [])

  return (
    <Container className={classes.body}>
      <Typography
        variant='h4'
        component='header'
        align='center'
        className={classes.text}>
        Download Latest Multichain
      </Typography>
      <br />
      <Typography
        variant='subtitle1'
        align='center'
        className={classes.text}>
        {current_action}
      </Typography>
      <br />
      <Typography
        variant='subtitle1'
        align='center'
        className={classes.text}>
        {`${progress}%`}
      </Typography>
      <Container className={classes.actions}>
        <Button
          size='sm'
          color='github'
          onClick={handleConfirm}>
          Confirm
        </Button>
        <GoBack path='/setup/about'>
          <Button
            size='sm'
            color='danger'>
            back
          </Button>
        </GoBack>
      </Container>
    </Container>
  );
}

export default DownloadLatest;