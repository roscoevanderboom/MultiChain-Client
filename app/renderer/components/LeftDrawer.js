import React from 'react';

// Constants
// import Daemons from "../constants/Daemons";


// Components
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FingerprintIcon from '@material-ui/icons/Fingerprint';
import Link from '@material-ui/icons/Link';
import Close from '@material-ui/icons/Close';

// Styles
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles({
  drawer: {
    width: 250,
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10
  },
  fullList: {
    width: 'auto',
  },
  barIcon: {
    color: 'white'
  },
  active: {
    border: '2px solid green',
    borderRadius: '8px'
  },
  stopBtn: {
    justifyContent: 'flex-end'
  }
});

export default function Drawers({ props }) {
  const classes = useStyles();
  const [state, setState] = React.useState({ left: false, });
  const [activeChain, setActiveChain] = React.useState(false);

  const { localchains, multichain } = props.state;
  const { openModal, setChain, stopChain } = props.functions;

  const toggleDrawer = (side, open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [side]: open });
  };

  const connect = (chain) => {
    setChain(chain);
    setActiveChain(chain);
  }

  const start = async (chain) => {
    // Daemons.startMultichain(chain);
    connect(chain)
    setTimeout(() => {

    }, 1000);
  }

  const stop = () => {
    multichain.stop()
    stopChain()
  }

  const leftMenu = side => (
    <div
      className={classes.drawer}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)} >
      <br></br>
      <Typography variant="h6" className={classes.list}>
        Local chains
      <Button key={'create'} variant="outlined" onClick={() => openModal('CreateChain')}>Create</Button>
      </Typography>
      <Divider />
      <List>
        {localchains.map(chain => (
          <ListItem
            className={chain === activeChain ? classes.active : ' '}
            button key={chain}>
            <ListItemIcon>
              <Link />
            </ListItemIcon>
            <ListItemText
              onClick={() => start(chain)}
              primary={chain} />
            <ListItemIcon
              onClick={stop}
              className={classes.stopBtn}>
              <Close />
            </ListItemIcon>
          </ListItem>
        ))}
      </List>
    </div>
  );


  return (
    <React.Fragment>
      <Button onClick={toggleDrawer('left', true)}>
        <FingerprintIcon className={classes.barIcon} />
      </Button>
      <Drawer open={state.left} onClose={toggleDrawer('left', false)}>
        {leftMenu('left')}
      </Drawer>
    </React.Fragment>
  );
}
