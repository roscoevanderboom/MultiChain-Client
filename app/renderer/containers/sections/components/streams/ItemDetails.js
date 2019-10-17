// Services
import React, { useState, useEffect } from 'react';

// Components
import {
  Card,
  Collapse,
  ListItem,
  ListItemText,
  ListItemIcon,
  Button,
  CardContent,
  Typography,
} from '@material-ui/core';

// Icons
import { ExpandLess, ExpandMore, InboxIcon } from '@material-ui/icons';

// Style
const style = {
  card: {
    border: 'solid 1px black',
    margin: 5,
  },
  publishers: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 12
  },
  keys: {
    display: 'flex',
    justifyContent: 'flex-start',
    marginTop: 12
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap'
  },
}

const itemKeys = [
  'available',
  'blocktime',
  'confirmations',
  'offchain',
  'txid',
]

export default ({ item }) => {
  const [dataKeys, setDataKeys] = useState([]);
  const [dataValues, setDataValues] = useState([]);
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    open ? setOpen(false) : setOpen(true);
  };

  useEffect(() => {
    setDataKeys(Object.keys(JSON.parse(item.data.json)));
    setDataValues(Object.values(JSON.parse(item.data.json)));
  }, [])

  return (
    <Card raised={true} style={style.card}>
      <CardContent>
        {dataKeys.map((key, i) =>
          <React.Fragment key={i}>
            <Typography variant="h6" component="h6">
              {`${key}`}
            </Typography>
            <Typography variant="body2" component="p">
              {`${dataValues[i]}`}
            </Typography>
          </React.Fragment>
        )}
      </CardContent>

      <CardContent>
        <ListItem button onClick={handleClick}>
          <ListItemText primary="Item details" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        { /* Collapse section*/}
        <Collapse in={open} timeout="auto" unmountOnExit>
          <div style={style.publishers}>
            <Typography variant="h6" component="h6">
              Publishers:
            </Typography>
            <select>
              {item.publishers.map((key, i) =>
                <option key={i} value={key}>{`${key}`}</option>
              )}
            </select>
          </div>

          <div style={style.keys}>
            <Typography variant="h6" component="h6">
              Keys:
            </Typography>
            {item.keys.map((key, i) =>
              <Button variant='outlined' key={i} value={key}>{`${key}`}</Button>
            )}
          </div>

          <div style={style.footer}>
            {itemKeys.map(key =>
              <ListItemText
                key={key}
                primary={key.toUpperCase()}
                secondary={`${item[key]}`} />
            )}
          </div>

        </Collapse>
      </CardContent>
    </Card>
  )
}
