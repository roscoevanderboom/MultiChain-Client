// Services
import React, { useState } from 'react';

// Components
import {
  Dialog,
  DialogContent,
  Typography
} from '@material-ui/core';
import Button from '../../components/CustomButtons/Button';

import DetailsCollapse from '../../components/CustomCollapse/Collapse-Object';
import ParamsCollapse from '../../components/CustomCollapse/Collapse-Object';
import InfoCollapse from '../../components/CustomCollapse/Collapse-Object';
import IndexesCollapse from '../../components/CustomCollapse/Collapse-Object';

import styles from './styles';

const StreamDetails = ({ stream }) => {
  const classes = styles();
  const [open, setOpen] = useState(false);

  const handleModal = () => {
    open ? setOpen(false) : setOpen(true);
  };

  return (
    <React.Fragment>
      <Button color='info' size='sm' onClick={handleModal}>Details</Button>
      <Dialog open={open} onClose={handleModal}>
        <DialogContent style={{ width: 550 }}>
          <Typography variant="h4">{stream.name}</Typography>

          <DetailsCollapse
            title='Details'
            data={stream.details}
            containerstyles={classes.collapseContainer} />

          <ParamsCollapse
            title='Restriction'
            data={stream.restrict}
            containerstyles={classes.collapseContainer}  />

          <InfoCollapse
            title='Info'
            data={stream.restrict} 
            containerstyles={classes.collapseContainer} />

          {!stream.subscribed ? null :
            <IndexesCollapse
              title='Indexes'
              data={stream.indexes}
              containerstyles={classes.collapseContainer}  />}

        </DialogContent>
      </Dialog>
    </React.Fragment>
  )
}
export default StreamDetails;