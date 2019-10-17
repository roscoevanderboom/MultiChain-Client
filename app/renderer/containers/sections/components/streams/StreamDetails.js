// Services
import React, { useState, useEffect } from 'react';

// Components
import {
  Button,
  Dialog,
  DialogContent,
  Typography
} from '@material-ui/core';

import fullList from './FullList'
import shortList from './ShortList'

const style = {
  flex1: {
    display: 'flex',
    justifyContent: 'space- evenly',
  },
  flex: {
    display: 'flex',
    justifyContent: 'space- evenly',
    flexWrap: 'wrap'
  },
  general: { width: '20%', marginRight: 10 },
  indexes: { width: '47%', marginRight: 10 },
}

export default ({ stream }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant='outlined' onClick={handleClickOpen}>Details</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <Typography variant="h4">{`${stream.name}`}</Typography>
          {stream.subscribed ? fullList(stream, style) : shortList(stream, style)}
        </DialogContent>
      </Dialog>
    </React.Fragment>
  )
}
