//
import React, { useState } from 'react';

// Components
import { Drawer, Button } from '@material-ui/core';

import { Fingerprint } from '@material-ui/icons';
import leftMenu from './LeftDrawer/LeftMenu';

const style = {
  barIcon: {
    color: 'white'
  }
}

export default () => {
  const [state, setState] = useState({ left: false, });

  const toggleDrawer = (side, open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [side]: open });
  };

  return (
    <React.Fragment>
      <Button onClick={toggleDrawer('left', true)}>
        <Fingerprint style={style.barIcon} />
      </Button>
      <Drawer open={state.left} onClose={toggleDrawer('left', false)}>
        {leftMenu('left', toggleDrawer)}
      </Drawer>
    </React.Fragment>
  );
}


//
