// Services
import React, { useState, useEffect, useContext } from 'react';

// State
import { GlobalState } from '../../state/state';

// Actions
import { listAssets } from '../../actions/Assets';

// Components
import {
  Typography,
  List,
  Toolbar,
} from '@material-ui/core';

// Modals
import NewAsset from './components/assets/NewAsset'
import AssetCard from './components/assets/assetCard'

export default ({ classes }) => {
  const { state } = useContext(GlobalState);
  const { assets } = state;

  return (assets &&
    <React.Fragment>
      <Toolbar className={classes.toolbar}>
        <Typography variant="h5" component="h3">
          Assets:
        </Typography>
        <NewAsset />
      </Toolbar>

      <List className={classes.list}>
        {assets.map(asset =>
          <AssetCard key={asset.name} asset={asset} />
        )}
      </List>
    </React.Fragment>
  );
}
