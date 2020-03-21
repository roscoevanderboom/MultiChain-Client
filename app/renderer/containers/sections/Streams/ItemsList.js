// Services
import React, { useState, useEffect } from 'react';


// Components
import {
  Button,
  Card,
  CardHeader,
  Dialog,
  CardContent,
} from '@material-ui/core';
import ItemDetails from './ItemDetails';
import NewStreamItems from './NewStreamItems';
import KeyItemSearch from './streamQueries/Key-Items';
import PublisherItemSearch from './streamQueries/Publisher-Items';

// Styles
const style = {
  card: {
    padding: 12,
    overflow: 'scroll',
    minWidth: 595
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

export default ({ stream, streamMethods, streamState }) => {
  const [open, setOpen] = useState(false);
  const {
    listStreamItems,
    listStreamPublishers,
    listStreamKeys,
    listStreamKeyItems,
    listStreamPublisherItems
  } = streamMethods;

  const {
    streamKeys,
    streamPublishers,
    streamItems,
  } = streamState;

  const handleModal = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const updateAll = () => {
    listStreamItems({ count: 100 })
    listStreamKeys({ count: 100 })
    listStreamPublishers({ count: 100 })
  }

  useEffect(() => {
    if (stream) {
      updateAll()
    }
  }, [stream]);

  return (
    <React.Fragment>
      <Button variant='outlined' onClick={handleModal}>Items</Button>
      <Dialog
        open={open}
        onClose={handleModal}>
        <Card style={style.card}>
          <CardHeader
            avatar={
              <KeyItemSearch
                style={style}
                streamKeys={streamKeys}
                listStreamKeyItems={listStreamKeyItems} />}
            title={
              <PublisherItemSearch
                style={style}
                streamPublishers={streamPublishers}
                listStreamPublisherItems={listStreamPublisherItems} />
            } />

          <CardContent
            children={
              <NewStreamItems
                updateAll={updateAll}
                stream={stream} />
            } />

          <CardContent
            children={
              streamItems.map((item, i) =>
                <ItemDetails key={i} item={item} />
              )} />


        </Card>
      </Dialog>
    </React.Fragment>
  )
}
