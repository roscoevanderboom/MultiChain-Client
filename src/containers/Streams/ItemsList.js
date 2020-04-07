// Services
import React, { useState, useEffect } from 'react';


// Components
import {
  Button,
  Card,
  Dialog,
  CardContent,
  Grid
} from '@material-ui/core';
import ItemDetails from './ItemDetails';
import NewStreamItems from './NewStreamItems';
import KeyItemSearch from './streamQueries/Key-Items';
import PublisherItemSearch from './streamQueries/Publisher-Items';
import SectionHeader from '../../components/SectionHeader';
// Styles
import styles from './styles';

export default ({ stream, streamMethods, streamState }) => {
  const classes = styles();
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [keys, setKeys] = useState([]);
  const {
    listStreamItems,
    listStreamPublishers,
    listStreamKeys,
    listStreamPublisherItems
  } = streamMethods;

  const {
    streamPublishers,
    streamItems,
    streamKeys
  } = streamState;

  const handleModal = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const updateAll = () => {
    listStreamItems({ count: 100 })
    listStreamKeys({ count: 100 })
    listStreamPublishers({ count: 100 })
  }

  const key_Search = (array) => {
    let search_result = [];
    array.forEach(key => {
      streamItems.forEach(item => {
        if (item.keys.includes(key) && !search_result.includes(item)) {
          search_result.push(item)
        }
      });
    })
    return search_result;
  }

  useEffect(() => {
    setItems(key_Search(keys));
    // eslint-disable-next-line
  }, [keys])

  useEffect(() => {
    if (stream) {
      updateAll()
    }
    // eslint-disable-next-line
  }, [stream]);

  useEffect(() => {
    if (streamItems.length > 0) {
      setItems(streamItems);
    }
  }, [streamItems]);

  return (
    <React.Fragment>
      <Button variant='outlined' onClick={handleModal}>Items</Button>
      <Dialog
        open={open}
        onClose={handleModal}
        classes={{
          scrollPaper: classes.scrollPaper,
          paperWidthSm: classes.paperWidthSm
        }}>
        <SectionHeader>
          {stream.name}
        </SectionHeader>
        <Card className={classes.streamItem}>
          <CardContent>
            <Grid container>
              <Grid item xs={4}>
                <PublisherItemSearch
                  style={classes}
                  streamPublishers={streamPublishers}
                  listStreamPublisherItems={listStreamPublisherItems} />
              </Grid>
              <Grid item xs={8}
                style={{ display: 'flex', justifyContent:'center' }}>
                <NewStreamItems
                  updateAll={updateAll}
                  stream={stream} />
              </Grid>
            </Grid>
          </CardContent>

          <CardContent>
            <Grid container>
              <Grid item xs={12}>
                <KeyItemSearch
                  style={classes}
                  keys={keys}
                  streamKeys={streamKeys}
                  setKeys={setKeys} />
              </Grid>
            </Grid>
          </CardContent>

          <CardContent
            children={
              items.map((item, i) =>
                <ItemDetails key={i} item={item} />
              )} />
        </Card>
      </Dialog>
    </React.Fragment>
  )
}
