import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

// Components
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Input from '@material-ui/core/Input';
import Add from '@material-ui/icons/NoteAddOutlined';


import IconButton from '@material-ui/core/IconButton';

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
        <Tab label="Generic" {...a11yProps(0)} />
        <Tab label="Preset" {...a11yProps(1)} />
        <Tab label="Custom" {...a11yProps(2)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Input onChange={props.nameInput} placeholder="Chain name" />
        <IconButton onClick={props.genericChain}>
          <Add />
        </IconButton>
        <Typography gutterBottom>
          A generic chain will be created with default settings. This is a secure chain with most permissions
          set to  false.
        </Typography>
      </TabPanel>
      <TabPanel value={value} index={1}>
        preset
      </TabPanel>
      <TabPanel value={value} index={2}>
        Custom chain configs
      </TabPanel>
    </div>
  );
}








