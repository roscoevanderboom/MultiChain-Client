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
import NewAsset from '../Modals/assets/NewAsset'
import AssetBrowser from '../Modals/assets/AssetBrowser'

export default ({ classes }) => {
  const { state, methods } = useContext(GlobalState);
  const { multichain, assets } = state;
  const { feedback, setAssets } = methods;

  const getAssetlist = () => {
    listAssets(multichain)
      .then(res => setAssets(res))
      .catch(err => console.log(err))
  }

  useEffect(() => {
    if (!multichain) {
      setAssets([]);
      return;
    }
    getAssetlist()
  }, [multichain]);

  return (multichain &&
    <React.Fragment>
      <Toolbar className={classes.toolbar}>
        <Typography variant="h5" component="h3">
          Assets:
        </Typography>
        <NewAsset getAssetlist={getAssetlist} />
      </Toolbar>

      <List className={classes.list}>
        {assets.map(asset =>
          <AssetBrowser key={asset.name} asset={asset} />
        )}
      </List>


    </React.Fragment>
  );
}
