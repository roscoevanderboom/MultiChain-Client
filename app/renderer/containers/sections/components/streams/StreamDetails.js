// Services
import React, { useState } from 'react';

// Components
import {
  Button,
  Dialog,
  DialogContent,
  Typography
} from '@material-ui/core';

import DetailsCollapse from '../Details-Collapse';
import ParamsCollapse from '../Params-Collapse';
import InfoCollapse from '../Info-Collapse';
import IndexesCollapse from '../Indexes-Collapse';

export default ({ stream }) => {
  const [open, setOpen] = useState(false);

  const handleModal = () => {
    open ? setOpen(false) : setOpen(true);
  };
  const UnsubscribedList = () => {
    return (
      <React.Fragment>
        <br></br>
        <br></br>
        <DetailsCollapse details={stream.details} />
        <ParamsCollapse restrict={stream.restrict} />
        <InfoCollapse props={stream} />
      </React.Fragment>
    )
  };
  const SubscribedList = () => {
    return (
      <React.Fragment>
        <br></br>
        <br></br>
        <DetailsCollapse details={stream.details} />
        <ParamsCollapse restrict={stream.restrict} />
        <InfoCollapse props={stream} />
        <IndexesCollapse indexes={stream.indexes} />
      </React.Fragment>
    )
  };

  return (
    <React.Fragment>
      <Button variant='outlined' onClick={handleModal}>Details</Button>
      <Dialog open={open} onClose={handleModal}>
        <DialogContent style={{ width: 550 }}>
          <Typography variant="h4">{`${stream.name}`}</Typography>
          {stream.subscribed
            ? <SubscribedList />
            : <UnsubscribedList />}
        </DialogContent>
      </Dialog>
    </React.Fragment>
  )
}
