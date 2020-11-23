// Services
import React, { useContext } from 'react';
// State
import { store } from '../../store';
import * as s from '../../reducers/streams';

// Components
import {
  Switch,
  Typography,
  ListItem,
  ListItemIcon,
  ListItemText

} from '@material-ui/core';

import styles from './styles';

const StreamCard = ({ stream }) => {
  const classes = styles();
  const { state, reducers, hist } = useContext(store);
  const { multichain } = state.multichain_state;

  // Stream Methods
  const handleSubscribe = () => {
    s.handleSubscribe({ multichain, stream, reducers })
  }

  const handleSelect = () => {
    s.selectStream({stream, reducers});
    s.listStreamItems({ multichain, stream, count: 100, reducers });
    s.listStreamPublishers({ multichain, stream, count: 100, reducers });
    s.listStreamKeys({ multichain, stream, count: 100, reducers });
    hist.push('/home/streamBrowser')
  }

  return (
    <ListItem className={classes.listItem}>
      <ListItemText>
        <Typography
          onClick={handleSelect}
          className={classes.title}>
          {stream.name}
        </Typography>
      </ListItemText>

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
export default StreamCard;