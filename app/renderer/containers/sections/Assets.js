// Services
import React, { useContext } from 'react';

// State
import { GlobalState } from '../../state/state';

// Components
import {
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
