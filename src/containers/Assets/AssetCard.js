// Services
import React, { useState, useEffect, useContext } from 'react';

// State
import { store } from '../../store';

// Multichain
import { subscribe, unSubscribe } from '../../actions/Assets';

// Components
import {
  Switch,
  Card,
  CardHeader,
  CardActions,
  Typography,
} from '@material-ui/core';

import AssetDetails from './AssetDetails';
import AssetMenu from './AssetMenu';

import { makeStyles } from '@material-ui/core/styles';
import { defaultBoxShadow, defaultFont } from '../../assets/jss/material-kit-react';
const useStyles = makeStyles({
  card: {
    margin: 5,
    ...defaultBoxShadow
  },
  title: {
    ...defaultFont,
    fontSize: '1.5em',
  }
});

const AssetCard = ({ props }) => {
  const { asset } = props;
  const classes = useStyles();
  const [subscribed, setSubscribed] = useState(false);
  const { state, reducers } = useContext(store);
  const { chainInfo } = state;
  const { getChainData } = reducers;

  const subscribeToAsset = () => {
    if (!asset.subscribed) {
      subscribe(chainInfo.chainname, asset, state.localPaths.binariesPath)
        .then(() => getChainData('assets'))
      return;
    }
    unSubscribe(chainInfo.chainname, asset, state.localPaths.binariesPath)
      .then(() => getChainData('assets'))
  }

  useEffect(() => {
    setSubscribed(asset.subscribed);
  }, [asset])

  return (
    <Card className={classes.card}>
      <CardHeader
        className={classes.title}
        title={`${asset.name}`}
        action={<AssetMenu {...props} />} />
      <CardActions>
        <Typography
          variant='h5'
          color="textSecondary"
          gutterBottom>
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
export default AssetCard;