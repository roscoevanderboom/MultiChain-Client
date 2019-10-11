//
import React from 'react';

// Components
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import FingerprintIcon from '@material-ui/icons/Fingerprint';
import leftMenu from './components/LeftDrawer/LeftMenu';

export default function Drawers({ props }) {
  const [state, setState] = React.useState({ left: false, });

  const toggleDrawer = (side, open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [side]: open });
  };

  return (
    <React.Fragment>
      <Button onClick={toggleDrawer('left', true)}>
        <FingerprintIcon className={props.classes.barIcon} />
      </Button>
      <Drawer open={state.left} onClose={toggleDrawer('left', false)}>
        {leftMenu('left', toggleDrawer, props)}
      </Drawer>
    </React.Fragment>
  );
}


//
