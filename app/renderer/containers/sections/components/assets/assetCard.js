// Services
import React, { useState, useEffect, useContext } from 'react';
import { ipcRenderer } from 'electron';

// State
import { GlobalState } from '../../../../state/state';

// Components
import {
  Button,
  Switch,
  Card,
  CardHeader,
  CardActions,
  Typography,
} from '@material-ui/core';

import AssetDetails from './assetDetails';


import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles({
  card: {
    minWidth: 275,
    margin: 5,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column'
  },
  title: {
    fontSize: '1.5em',
  }
});
export default ({ asset, getAssetlist }) => {
  const classes = useStyles();
  const [subscribed, setSubscribed] = useState(false);
  const { state, methods } = useContext(GlobalState);
  const { activeChain } = state;

  const subscribeToAsset = () => {
    if (!asset.subscribed) {
      ipcRenderer.send('asset:subscribe', { activeChain, asset });
      return;
    }
    ipcRenderer.send('asset:unsubscribe', { activeChain, asset });
  }

  useEffect(() => {
    setSubscribed(asset.subscribed);
  }, [asset])

  useEffect(() => {
    ipcRenderer.on('subscribe:response', () => {
      getAssetlist()
    });
    ipcRenderer.on('unsubscribe:response', () => {
      getAssetlist()
    });
    return () => {
      ipcRenderer.removeAllListeners('subscribe:response');
      ipcRenderer.removeAllListeners('unsubscribe:response');
    }
  }, [])

  return (
    <Card className={classes.card}>
      <CardHeader
        title={`${asset.name}`} />
      <CardActions>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Subscribe:
          </Typography>
        <Switch
          checked={subscribed}
          onChange={subscribeToAsset}
          value="subscribed"
          color="primary"
          inputProps={{ 'aria-label': 'primary checkbox' }} />
        <AssetDetails asset={asset} />
      </CardActions>
    </Card>
  )
}
