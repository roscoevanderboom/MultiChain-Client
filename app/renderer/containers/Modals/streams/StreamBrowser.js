// Services
import React, { useState, useEffect } from 'react';

// Components
import { Paper, ListItemText, Dialog, DialogTitle } from '@material-ui/core';

// Styles
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1, 1),
    marginBottom: 10,
    cursor: 'pointer',
    border: 'solid black 1px'
  }
}));

export default ({props}) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);


  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <React.Fragment>
      <Paper onClick={handleClickOpen} className={classes.root} key={'Paper'}>
        <ListItemText
          key={'name'}
          primary={`Name: ${props[0]}`}
          secondary={`Subscribed: ${props[1]}`} />
        <ListItemText
          key={`Description`}
          primary={`Description:`}
          secondary={`${props[2].text}`} />
      </Paper>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{props[0]}</DialogTitle>
      </Dialog>
    </React.Fragment>
  )
}
