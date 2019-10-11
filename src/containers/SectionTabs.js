import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

// Containers
import ChainInfo from './sections/ChainInfo';
import Parameters from './sections/Parameters';
import Streams from './sections/Streams';
import Addresses from './sections/Addresses';
import Assets from './sections/Assets';
import Peers from './sections/Peers';
import Permissions from './sections/Permissions';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}>
      <Box p={3}>{children}</Box>
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

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: '#c5c3c3',
    position: 'fixed',
    top: 100,
    zIndex: '800',
  },
  scroll: {
    overflow: 'scroll',
    height: '86.5vh'
  }
}));

export default ({ props }) => {
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
          <Tab label="ChainInfo" {...tabProps(0)} />
          <Tab label="Parameters" {...tabProps(1)} />
          <Tab label="Streams" {...tabProps(2)} />
          <Tab label="Addresses" {...tabProps(3)} />
          <Tab label="Assets" {...tabProps(4)} />
          <Tab label="Peers" {...tabProps(5)} />
          <Tab label="Permissions" {...tabProps(6)} />
        </Tabs>
      </AppBar>
      <TabPanel className={classes.scroll} value={value} index={0}>
        <ChainInfo props={props} />
      </TabPanel>
      <TabPanel className={classes.scroll} value={value} index={1}>
        <Parameters props={props} />
      </TabPanel>
      <TabPanel className={classes.scroll} value={value} index={2}>
        <Streams props={props} />
      </TabPanel>
      <TabPanel className={classes.scroll} value={value} index={3}>
        <Addresses props={props} />
      </TabPanel>
      <TabPanel className={classes.scroll} value={value} index={4}>
        <Assets props={props} />
      </TabPanel>
      <TabPanel className={classes.scroll} value={value} index={5}>
        <Peers props={props} />
      </TabPanel>
      <TabPanel className={classes.scroll} value={value} index={6}>
        <Permissions props={props} />
      </TabPanel>
    </div>
  );
}








