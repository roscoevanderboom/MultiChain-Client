import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { shell } from 'electron';
import path from 'path';
// Constants
import chainPath from '../../../constants/multichain/Chainpaths';
import { createChain } from '../../../constants/multichain/Daemons';
import { getChainsList } from '../../../reducers/multichain';
import checkLocalStorage from '../../../constants/multichain/CheckLocalStorage';
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

const CustomTabPanel = () => {
  const { reducers, state } = useContext(store);
  const { feedback } = reducers;
  const { localPaths } = state.multichain_state;
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  const handle_chain = (data) => {
    // Send request to create new chain
    const { chainName, option } = data;
    const binariesPath = localPaths.binariesPath;
    createChain(chainName, binariesPath)
      .then(() => {
        switch (option) {
          case 'generic':
            feedback('success', `${chainName} has been created`);
            break;
          case 'preset':
            feedback('success', `${chainName} has been created`);
            break;
          default:
            feedback('info', `${chainName} has been created. Remember to edit params.dat before starting chain.`);
            break;
        }
        let { blockchainsPath } = checkLocalStorage();
        if (blockchainsPath === null) {
          localStorage.setItem("binariesPath", chainPath);
          reducers.dispatch_multichain_state({
            type: 'SET_LOCAL_PATHS',
            data: { ...localPaths, blockchainsPath: chainPath }
          })
        }
      })
      .catch(err => feedback('error', err.message));
  }

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
export default CustomTabPanel;