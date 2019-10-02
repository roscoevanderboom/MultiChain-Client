// Services
import React, { useState, useEffect } from 'react';

// Components
import {
  Paper,
  ListItemText,
  Modal,
  Fade,
  Switch,
  Backdrop
} from '@material-ui/core';

import List from './components/List'

// Styles
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1, 1),
    margin: 10,
    cursor: 'pointer',
    border: 'solid black 1px',
    width: 100
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    maxWidth: 600
  },
  list: {
    display: 'flex',
    flexWrap: 'wrap',

  },
  text: {
    width: '45%'
  }
}));

export default ({ props, multichain }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  function handleClickOpen() {
    if (props.subscribed) {
      setOpen(true);
      return
    }
    alert('You are not subscribed to this asset')
  }

  function handleClose() {
    setOpen(false);
  }

  const subscribeToAsset = (txid) => event => {
    console.log(txid);
    multichain.subscribe({
      asset: `${txid}`,
    }, (err, info) => {
      if (err) {
        console.log(err.message);
        return;
      }
      setSubscribed(true)
      console.log(info);
    });
  }

  useEffect(() => {
    setSubscribed(props.subscribed);
  }, [props])


  return (
    <React.Fragment>
      <Paper className={classes.root} key={'Paper'}>
        <ListItemText
          onClick={handleClickOpen}
          primary='Name:'
          secondary={props.name} />
        <ListItemText
          onClick={handleClickOpen}
          primary='Open:'
          secondary={`${props.open}`} />
        <ListItemText
          primary='Subscribed:' />
        <Switch
          checked={subscribed}
          onChange={subscribeToAsset(props.issuetxid)}
          value="subscribed"
          color="primary"
          inputProps={{ 'aria-label': 'primary checkbox' }}
        />
      </Paper>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}>
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">{props.details.text}</h2>
            <ListItemText
              primary='Issuetxid'
              secondary={`${props.issuetxid}`} />
            <List classes={classes} props={props} />
          </div>
        </Fade>
      </Modal>
    </React.Fragment>
  )
}
