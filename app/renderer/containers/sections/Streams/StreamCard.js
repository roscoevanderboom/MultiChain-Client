// Services
import React, { useState, useContext } from 'react';

// State
import { GlobalState } from '../../../state';

// Components
import {
  Switch,
  Card,
  CardHeader,
  CardActions,
  Typography,
} from '@material-ui/core';

import StreamDetails from './StreamDetails';
import ItemsList from './ItemsList';

import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles({
  card: {
    minWidth: 275,
    margin: 5,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: '1.5em',
  },
  pos: {
    marginBottom: 12,
  },
});
export default ({ stream }) => {
  const classes = useStyles();
  const { state, methods } = useContext(GlobalState);
  const { multichain } = state;
  const { feedback, update } = methods;
  const [streamKeys, setStreamKeys] = useState([]);
  const [streamPublishers, setStreamPublishers] = useState([]);
  const [streamItems, setStreamItems] = useState([]);

  // Stream Methods
  const handleSubscribe = () => {
    if (stream.subscribed) {
      multichain.unsubscribe({
        stream: stream.name,
      })
        .then(() => {
          update('streams')
        })
        .catch(err => feedback('error', err.message))
      return;
    }
    multichain.subscribe({
      stream: stream.name,
    })
      .then(() => {
        update('streams')
      })
      .catch(err => feedback('error', err.message))
  }
  const listStreamItems = ({ count }) => {
    multichain.listStreamItems({
      stream: stream.name,
      count: count
    })
      .then(res => setStreamItems(res.reverse()))
      .catch((err) => {
        setStreamItems([])
      })
  }
  const listStreamPublishers = ({ count }) => {
    multichain.listStreamPublishers({
      stream: stream.name,
      count: count
    })
      .then(res => setStreamPublishers(res))
      .catch((err) => {
        setStreamPublishers([])
      })
  }
  const listStreamKeys = ({ count }) => {
    multichain.listStreamKeys({
      stream: stream.name,
      count: count
    })
      .then(res => setStreamKeys(res))
      .catch((err) => {
        setStreamKeys([])
      })
  }
  // Search fucntions
  const listStreamKeyItems = (key) => {
    if (key === 'all') {
      listStreamItems({ count: 100 })
      return;
    }
    multichain.listStreamKeyItems({
      stream: stream.name,
      key: key
    })
      .then(res => setStreamItems(res.reverse()))
      .catch((err) => {
        setStreamItems([])
      })
  }
  const listStreamPublisherItems = (address) => {
    if (address === 'all') {
      listStreamItems({ count: 100 })
      return;
    }
    multichain.listStreamPublisherItems({
      stream: stream.name,
      address: address
    })
      .then(res => setStreamItems(res.reverse()))
      .catch((err) => {
        setStreamItems([])
      })
  }
  const streamState = {
    streamKeys,
    streamPublishers,
    streamItems,
  }
  const streamMethods = {
    listStreamItems,
    listStreamPublishers,
    listStreamKeys,
    listStreamKeyItems,
    listStreamPublisherItems
  }

  return (
    <Card className={classes.card}>
      <CardHeader
        title={`${stream.name}`} />
      <CardActions
        children={
          <React.Fragment>
            <StreamDetails stream={stream} />
            <ItemsList
              streamMethods={streamMethods}
              streamState={streamState}
              stream={stream} />
          </React.Fragment>
        } />
      <CardActions
        children={
          <React.Fragment>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              Subscribe:
            </Typography>
            <Switch
              checked={stream.subscribed}
              onClick={handleSubscribe}
              value="subscribed"
              color="primary"
              inputProps={{ 'aria-label': 'primary checkbox' }} />
          </React.Fragment>
        } />
    </Card>
  )
}





