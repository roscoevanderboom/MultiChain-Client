// Services
import React, { useState, useEffect, useContext } from 'react';

// State
import { GlobalState } from '../../../../state/state';

// Constants
import notIncluded from '../../../../constants/NotIncluded';

// Actions
import {
  listStreamItems
} from '../../../../actions/Streams';

// Components
import {
  Button,
  Card,
  CardHeader,
  Dialog,
  Typography,
} from '@material-ui/core';
import ItemDetails from './ItemDetails';
import NewStreamItems from './NewStreamItems';

// Icons

// Styles
const style = {
  card: {
    padding: 12,
    overflow: 'scroll',
    minWidth: 600
  },
  filters: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column'
  },
  select: {
    padding: 3
  }
}

export default ({ stream, getStreamList }) => {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [streamKeys, setStreamKeys] = useState([]);
  const [streamPublishers, setStreamPublishers] = useState([]);

  const { state } = useContext(GlobalState);
  const { multichain } = state;

  const handleModal = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const getStreamItemsList = () => {
    listStreamItems(multichain, stream)
      .then(res => setItems(res.reverse()))
      .catch(err => console.log(err))
  }

  useEffect(() => {
    getStreamItemsList()
  }, [stream]);


  useEffect(() => {
    let keys = [];
    let publishers = [];
    items.forEach(item => {
      item.keys.map(key => notIncluded(keys, key));
      item.publishers.map(pub => notIncluded(publishers, pub))
    });
    setStreamKeys(keys);
    setStreamPublishers(publishers);
  }, [items, stream]);

  return (
    <React.Fragment>
      <Button variant='outlined' onClick={handleModal}>Items</Button>
      <Dialog
        open={open}
        onClose={handleModal}>
        <Card style={style.card}>
          <CardHeader
            avatar={
              <React.Fragment>
                <Typography variant="h6" component="h6">
                  Keys:
                </Typography>
                <select style={style.select}>
                  {streamKeys.map(key =>
                    <option value={key} key={key}>{key}</option>
                  )}
                </select>
              </React.Fragment>
            }
            title={
              <React.Fragment>
                <Typography variant="h6" component="h6">
                  Publishers:
                </Typography>
                <select style={style.select}>
                  {streamPublishers.map(pub =>
                    <option value={pub} key={pub}>{pub}</option>
                  )}
                </select>
              </React.Fragment>
            }
            action={
              <NewStreamItems stream={stream} getStreamList={getStreamList} />
            } />

          {items.map((item, i) =>
            <ItemDetails key={i} item={item} />
          )}
        </Card>
      </Dialog>
    </React.Fragment>
  )
}
