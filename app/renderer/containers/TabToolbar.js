import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

// Components
import ChainInfo from '../components/ChainInfo';
import Parameters from '../components/Parameters';
import Streams from '../components/Streams';
import Addresses from '../components/Addresses';
import Consensus from '../components/Consensus';
import Assets from '../components/Assets';
import Peers from '../components/Peers';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    position: 'fixed',
    top: 100,
    zIndex: '800'
  },
}));

export default function ScrollableTabsButtonAuto({props}) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example">
          <Tab label="ChainInfo" {...a11yProps(0)} />
          <Tab label="Parameters" {...a11yProps(1)} />
          <Tab label="Streams" {...a11yProps(2)} />
          <Tab label="Addresses" {...a11yProps(3)} />
          <Tab label="Assets" {...a11yProps(4)} />
          <Tab label="Consensus" {...a11yProps(5)} />
          <Tab label="Peers" {...a11yProps(6)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <ChainInfo props={props} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Parameters props={props} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Streams props={props} />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Addresses props={props} />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <Assets props={props} />
      </TabPanel>
      <TabPanel value={value} index={5}>
        <Consensus props={props} />
      </TabPanel>
      <TabPanel value={value} index={6}>
        <Peers props={props} />
      </TabPanel>
    </div>
  );
}








