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

const CollapseArray = ({ name, props }) => {
  const [open, setOpen] = useState(false);
  const [dataValues, setDataValues] = useState([]);

  const handleClick = () => {
    open ? setOpen(false) : setOpen(true);
  };

  useEffect(() => {
    if (props) {
      setDataValues(props);
    }
  }, [props])

  return (
    <React.Fragment>
      <ListItem button onClick={handleClick}>
        <ListItemText primary={name} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {dataValues.map((val, i) =>
          <ListItemText
            key={i}
            primary={val} />
        )}
      </Collapse>
    </React.Fragment>
  )
}

export default CollapseArray;