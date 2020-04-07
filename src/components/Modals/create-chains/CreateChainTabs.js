import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { ipcRenderer, shell } from 'electron';
import path from 'path';
import { createChain } from '../../../constants/multichain/Daemons'
// State
import { store } from '../../../store';

// Components
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import Generic from './components/Generic';
import Presets from './components/Presets';
import Custom from './components/Custom';

// Styles
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

function TabPanel(props) {
  const { children, value, index } = props;
  const classes = useStyles();

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
    >
      <Box className={classes.tabPanel} p={3}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function tabProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

export default () => {
  const { reducers, state } = useContext(store);
  const { feedback } = reducers;
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  const handle_chain = (data) => {
    // Send request to create new chain
    const { chainName, option } = data;
    const binariesPath = state.localPaths.binariesPath;
    createChain(chainName, binariesPath)
      .then(() => {
        switch (option) {
          case 'generic':
            console.log('Generic success');
            break;
          case 'preset':
            console.log('Preset success');
            break;
          default:
            console.log('Costum success');
            shell.openItem(path.join(state.localPaths.blockchainsPath, chainName, 'params.dat'));
            break;
        }
      })
      .catch(err => console.log(err));
  }

  useEffect(() => {
    // Receive success / fail response
    ipcRenderer.on('chain-create:success', (e, response) => {
      feedback('success', response);

    });
    ipcRenderer.on('chain-create:fail', (e, response) => {
      feedback('error', response);
    });

    return () => {
      ipcRenderer.removeAllListeners('chain-create:success');
      ipcRenderer.removeAllListeners('chain-create:fail');
    }
  }, []);

  return (
    <div className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example">
        <Tab label="Generic" {...tabProps(0)} />
        <Tab label="Preset" {...tabProps(1)} />
        <Tab label="Custom" {...tabProps(2)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Generic createChain={handle_chain} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Presets createChain={handle_chain} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Custom createChain={handle_chain} />
      </TabPanel>
    </div>
  );
}








