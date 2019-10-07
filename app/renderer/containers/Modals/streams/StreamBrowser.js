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

export default ({ stream, props }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const { multichain } = props.state;


  function handleClickOpen() {
    listItems()
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  const listItems = () => {
    multichain.listStreamItems({
      stream: stream.name,
    }, (err, info) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log(info)
    })
  }
  const subscribe = () => {
    multichain.subscribe({
      stream: stream.name,
    }, (err, info) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log(info)
    })
  }

  useEffect(() => {
    console.log(stream)
  }, [stream])

  return (
    <React.Fragment>
      <Paper onClick={handleClickOpen} className={classes.root} key={'Paper'}>
        <ListItemText
          key={'name'}
          primary={`Name: ${stream.name}`}
          secondary={`Subscribed: ${stream.subscribed}`} />
        <ListItemText
          key={`Description`}
          primary={`Description:`}
          secondary={`${stream.details.text}`} />
      </Paper>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{` ${stream.name}`}</DialogTitle>
      </Dialog>
    </React.Fragment>
  )
}
