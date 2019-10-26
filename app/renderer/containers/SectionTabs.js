import React from 'react';
import PropTypes from 'prop-types';

// Components
import {
  AppBar,
  Tab,
  Tabs,
  Typography,
  Box
} from '@material-ui/core';

// Containers
import ChainInfo from './sections/ChainInfo';
import Parameters from './sections/Parameters';
import Streams from './sections/Streams';
import Addresses from './sections/Addresses';
import Assets from './sections/Assets';
import Peers from './sections/Peers';
import Permissions from './sections/Permissions';

// Style
import { makeStyles } from '@material-ui/core/styles';

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
  },
  list: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  text: {
    width: '30%'
  },
  paramsText: {
    width: '47%'
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between'
  }
}));

export default () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  const sectionsArray = [
    <ChainInfo classes={classes} />,
    <Parameters classes={classes} />,
    <Streams classes={classes} />,
    <Addresses classes={classes} />,
    <Assets classes={classes}  />,
    // <Peers classes={classes} />,
    <Permissions classes={classes} />
  ];
  const tabsArray = [
    "ChainInfo",
    "Parameters",
    "Streams",
    "Addresses",
    "Assets",
    // "Peers",
    "Permissions"
  ];

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
          {tabsArray.map((section, i) =>
            <Tab key={i} label={`${section}`} {...tabProps(i)} />
          )}
        </Tabs>
      </AppBar>
      {sectionsArray.map((section, i) =>
        <TabPanel key={i} className={classes.scroll} value={value} index={i}>
          {section}
        </TabPanel>
      )}
    </div>
  );
}








