// Services
import React, { useState } from 'react';
// Components
import {
  Collapse,
  ListItem,
  ListItemText,
} from '@material-ui/core';
// Icons
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import PermissionSwitch from '../CustomSwitch/PermissionSwitch';

// Constants
import { address_permissions } from '../../../constants/Permissions';

// Styles
const style = {
  list: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  item: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '20%',
    alignItems: 'center',
    border: 'solid black 1px',
    margin: 1
  },
  span: {
    marginLeft: 15
  }
}

export default ({ address, globalState }) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    open ? setOpen(false) : setOpen(true);
  };

  return (
    <React.Fragment>
      <ListItem button onClick={handleClick}>
        <ListItemText primary={address.address} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <div style={style.list}>
          {address_permissions.map((val) =>
            <div style={style.item}>
              <span style={style.span}>{val}</span>
              <PermissionSwitch
                name={val}
                address={address}
                globalState={globalState} />
            </div>
          )}
        </div>

      </Collapse>
    </React.Fragment>
  )
}
