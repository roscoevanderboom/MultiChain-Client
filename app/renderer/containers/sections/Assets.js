// Services
import React, { useState, useEffect } from 'react';

// Actions
import listAssets from '../../actions/Assets';

// Components
import {
  Typography,
  List,
  Toolbar,
} from '@material-ui/core';

// Modals
import NewAsset from '../Modals/assets/NewAsset'
import AssetBrowser from '../Modals/assets/AssetBrowser'

// Styles
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1, 1),
  },
  list: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  text: {
    width: '30%'
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between'
  }
}))

export default function Assets({ props }) {
  const classes = useStyles();
  const [assetList, setAssetList] = useState([]);


  const { multichain } = props.state;

  const getAssetlist = () => {
    listAssets(multichain, setAssetList);
  }

  useEffect(() => {
    if (multichain) {
      getAssetlist()
    }
  }, [multichain]);

  const newProps = props;
  newProps.functions.getAssetlist = getAssetlist;

  return (
    <React.Fragment>
      <Toolbar className={classes.toolbar}>
        <Typography variant="h5" component="h3">
          Assets:
        </Typography>
        <NewAsset props={props} />
      </Toolbar>

      <List className={classes.list}>
        {assetList.map(asset =>
          <AssetBrowser key={asset.name} props={asset} multichain={multichain}/>
        )}
      </List>


    </React.Fragment>
  );
}
