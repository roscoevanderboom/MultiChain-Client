// Services
import React, { useState, useEffect } from 'react';

// Components
import {
  Collapse,
  ListItem,
  ListItemText,
} from '@material-ui/core';

// Icons
import { ExpandLess, ExpandMore } from '@material-ui/icons';

// Style
const style = {
  footer: {
    display: 'flex',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap'
  },
  listItem: {
    marginLeft: 10,
  }
}

export default ({ name, props, newStyle }) => {
  const [dataKeys, setDataKeys] = useState([]);
  const [dataValues, setDataValues] = useState([]);
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    open ? setOpen(false) : setOpen(true);
  };
  // Props should be an object of 2 arrays
  useEffect(() => {
    if (props.dataKeys && props.dataValues) {
      setDataKeys(props.dataKeys);
      setDataValues(props.dataValues);
      return;
    }
    let keys = [];
    let values = [];

    props.forEach(val => {
      keys.push(Object.keys(val)[0]);
      values.push(Object.values(val)[0]);
    })
    setDataKeys(keys)
    setDataValues(values)
  }, [props])

  return (
    <React.Fragment>
      <ListItem button onClick={handleClick}>
        <ListItemText primary={name} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <div style={newStyle !== undefined ? newStyle.footer : style.footer}>
          {dataKeys.map((key, i) =>
            <ListItemText
              style={newStyle !== undefined ? newStyle.listItem : style.listItem}
              key={i}
              primary={key}
              secondary={name === 'CONSENSUS' ? `${dataValues[i]*100}%` : `${dataValues[i]}`} />
          )}
        </div>
      </Collapse>
    </React.Fragment>
  )
}
