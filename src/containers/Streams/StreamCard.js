// Services
import React, { useState, useContext } from 'react';

// State
import { store } from '../../store';

// Components
import {
  Switch,
  Typography,
  ListItem,
  Grid,
  ListItemIcon,
  ListItemText

} from '@material-ui/core';

import StreamDetails from './StreamDetails';
import ItemsList from './StreamItems/ItemsList';

import styles from './styles';
export default ({ stream, activeStream, setActiveStream }) => {
  const classes = styles();
  const { state, reducers } = useContext(store);
  const { multichain } = state;
  const { getChainData, feedback } = reducers;
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
          getChainData('streams')
        })
        .catch(err => feedback('error', err.message))
      return;
    }
    multichain.subscribe({
      stream: stream.name,
    })
      .then(() => {
        getChainData('streams')
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
    activeStream
  }
  const streamMethods = {
    listStreamItems,
    listStreamPublishers,
    listStreamKeys,
    listStreamKeyItems,
    listStreamPublisherItems,
    setActiveStream
  }

  return (
    <ListItem className={classes.listItem}>
      <Grid item xs={6}>
        <ListItemText>
          <Typography
            className={classes.title}>
            {stream.name}
          </Typography>
        </ListItemText>
      </Grid>

      <Grid item xs={4}>
        <ListItemText>
        <StreamDetails stream={stream} />
        <ItemsList
          streamMethods={streamMethods}
          streamState={streamState}
          stream={stream} />
        </ListItemText>
      </Grid>

      <ListItemIcon>
        <div className={classes.bullet}>
          <Typography className={classes.title}>
            Subscribed
          </Typography>
          <Switch
            checked={stream.subscribed}
            onClick={handleSubscribe}
            value="subscribed"
            color="primary"
            inputProps={{ 'aria-label': 'primary checkbox' }} />
        </div>
      </ListItemIcon>
    </ListItem>
  )
}





