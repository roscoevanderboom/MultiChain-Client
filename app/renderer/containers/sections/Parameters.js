// Services
import React, { useState, useEffect } from 'react';

// Actions
import getBlockchainParams from '../../actions/Parameters';

// Components
import MainParams from './components/parameters/Params';
import Consensus from './components/parameters/Consensus';
import Genesis from './components/parameters/Genesis';
import Network from './components/parameters/Network';
import Mining from './components/parameters/Mining';

// Styles
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  list: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  text: {
    width: '47%'
  }
}));


export default ({ props }) => {
  const classes = useStyles();
  const [params, setParams] = useState([]);
  const { multichain, activeChain } = props.state;

  const listParameters = () => {
    getBlockchainParams(multichain, setParams)
  }


  useEffect(() => {
    if (!activeChain) {
      setParams([]);
    }
  }, [activeChain])

  useEffect(() => {
    if (multichain) {
      listParameters();
    };
  }, [multichain])

  return (
    <React.Fragment>
      <MainParams props={params} classes={classes} />
      <Consensus props={params} classes={classes} />
      <Genesis props={params} classes={classes} />
      <Network props={params} classes={classes} />
      <Mining props={params} classes={classes} />
    </React.Fragment>
  );
}
