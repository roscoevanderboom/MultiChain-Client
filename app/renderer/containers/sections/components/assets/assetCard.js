// Services
import React, { useState, useEffect, useContext } from 'react';

// State
import { GlobalState } from '../../../../state/state';

// Multichain
import { subscribe, unSubscribe } from '../../../../multichain/Multichain-Functions'

// Components
import {
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

export default ({ asset }) => {
  const classes = useStyles();
  const [subscribed, setSubscribed] = useState(false);
  const { state, methods } = useContext(GlobalState);
  const { activeChain } = state;
  const { update } = methods;

  const subscribeToAsset = () => {
    if (!asset.subscribed) {
      subscribe(activeChain, asset)
        .then(() => update('assets'))
      return;
    }
    unSubscribe(activeChain, asset)
      .then(() => update('assets'))
  }

  useEffect(() => {
    setSubscribed(asset.subscribed);
  }, [asset])

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
