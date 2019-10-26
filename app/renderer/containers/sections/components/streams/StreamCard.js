// Services
import React, { useContext } from 'react';

// State
import { GlobalState } from '../../../../state/state';

// Actions
import {
  subscribe,
  unsubscribe,
} from '../../../../actions/Streams';

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
export default ({ stream, getStreamList }) => {
  const classes = useStyles();
  const { state, methods } = useContext(GlobalState);
  const { multichain } = state;
  const { feedback } = methods;

  const handleSubscribe = () => {
    if (stream.subscribed) {
      unsubscribe(multichain, getStreamList, stream)
        .then(res => {
          console.log(res)
        })
        .catch(err => feedback('error', err.message))
      return;
    }
    subscribe(multichain, getStreamList, stream)
      .then(res => {
        console.log(res)
      })
      .catch(err => feedback('error', err.message))
  }

  return (
    <Card className={classes.card}>
      <CardHeader
        title={`${stream.name}`} />
      <StreamDetails stream={stream} />
      <ItemsList stream={stream} />
      <CardActions>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Subscribe:
          </Typography>
        <Switch
          checked={stream.subscribed}
          onClick={handleSubscribe}
          value="subscribed"
          color="primary"
          inputProps={{ 'aria-label': 'primary checkbox' }} />
      </CardActions>
    </Card>
  )
}





