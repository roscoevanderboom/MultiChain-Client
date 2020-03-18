import React, { useContext, useEffect, useState } from 'react';
import { ipcRenderer } from 'electron';
import { store } from '../../store';
// Components
import { Container, Typography } from '@material-ui/core';
import Button from '../CustomButtons/Button';
import { GoBack } from '../NavButtons';
// Styles
import useStyles from './styles';

export default () => {
  const classes = useStyles();
  const { hist } = useContext(store);

  const [progress, setProgress] = useState(0);
  const [current_action, setCurrent_action] = useState('Click confirm to start download');

  const handleConfirm = () => {
    ipcRenderer.send('download:confirmed');
  }

  useEffect(() => {
    ipcRenderer.on('download:progress', (e, data) => {
      setCurrent_action('Downloading...')
      setProgress((data * 100).toFixed(0));
    });
    ipcRenderer.on('download:complete', () => {
      setProgress(100)
      setCurrent_action('Download complete');
    });
    ipcRenderer.on('unzip:begin', () => {
      setCurrent_action('Extracting source files...');
    });
    ipcRenderer.on('unzip:complete', (e, { chainpaths, target }) => {
      localStorage.setItem("binariesPath", target);
      localStorage.setItem("blockchainsPath", chainpaths);
      hist.push('/home/dashboard');
    });
    ipcRenderer.on('unzip:error', (e, err) => {
      console.log(err);
    });
    return () => {
      ipcRenderer.removeAllListeners('download:progress');
      ipcRenderer.removeAllListeners('download:complete');
      ipcRenderer.removeAllListeners('unzip:begin');
      ipcRenderer.removeAllListeners('unzip:complete');
      ipcRenderer.removeAllListeners('unzip:error');
    }
  }, [])

  return (
    <Container>
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
          color='github'
          onClick={handleConfirm}>
          Confirm
        </Button>
        <GoBack path='/setup/about'>
          <Button
            color='danger'>
            back
          </Button>
        </GoBack>
      </Container>
    </Container>
  );
}