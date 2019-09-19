import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

// Components
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import Generic from '../components/createchains/Generic'
import Presets from '../components/createchains/Presets'
import Custom from '../components/createchains/Custom'

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

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function ScrollableTabsButtonAuto({ props }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
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
        <Generic props={props} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Presets props={props} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Custom props={props} />
      </TabPanel>
    </div>
  );
}








