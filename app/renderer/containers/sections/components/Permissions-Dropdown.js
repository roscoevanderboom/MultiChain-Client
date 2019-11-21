import React, { useState, useEffect } from 'react';

// Components
import { List, ListItem, ListItemText, Menu, MenuItem, Switch } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
}));

export default ({ options, name, handleClick, switchValues }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const [selectedIndex, setSelectedIndex] = useState(0)

  const handleClickListItem = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, index, option) => {
    handleClick(index, option, name)
    setSelectedIndex(index);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    // console.log(switchValues)

  }, [switchValues])

  return (
    <div className={classes.root}>
      <List component="nav">
        <ListItem
          button
          aria-haspopup="true"
          aria-controls="lock-menu"
          aria-label={name}
          onClick={handleClickListItem} >
          <ListItemText primary={name} />
        </ListItem>
      </List>
      <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {options.map((option, index) => (
          <MenuItem
            key={option}
            selected={index === selectedIndex}>
            {option}
            {<Switch
              onClick={event => handleMenuItemClick(event, index, option)}
              value={Boolean(true)}
            />}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
