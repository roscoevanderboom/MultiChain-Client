// Services
import React, { useState, useEffect } from 'react';

// Components
import {
  Button,
  Dialog,
  DialogContent,
  Typography
} from '@material-ui/core';

import SubscribedList from './SubscribedList'
import UnsubscribedDetails from './UnsubscribedDetails'

export default ({ stream }) => {
  const [open, setOpen] = useState(false);

  const handleModal = () => {
    open ? setOpen(false) : setOpen(true);
  };

  return (
    <React.Fragment>
      <Button variant='outlined' onClick={handleModal}>Details</Button>
      <Dialog open={open} onClose={handleModal}>
        <DialogContent style={{ width: 550 }}>
          <Typography variant="h4">{`${stream.name}`}</Typography>
          {stream.subscribed
            ? <SubscribedList stream={stream} />
            : <UnsubscribedDetails stream={stream} />}
        </DialogContent>
      </Dialog>
    </React.Fragment>
  )
}
