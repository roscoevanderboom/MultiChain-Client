// Services
import React from 'react';
// Components
import Collapse from '../../components/CustomCollapse'
import PermissionSwitch from '../../components/CustomSwitch/PermissionSwitch';

// Constants
import { address_permissions } from '../../constants/multichain/Permissions';
// Styles
import useStyles from './styles';

export default ({ address }) => {
  const classes = useStyles();


  return (
    <Collapse title='Permissions'
      className={classes.listItem}>
      <div className={classes.list}>
        {address_permissions.map((val, i) =>
          <div key={i}
            className={classes.item}>
            <span className={classes.span}>{val}</span>
            <PermissionSwitch
              name={val}
              address={address} />
          </div>
        )}
      </div>
    </Collapse>
  )
}


