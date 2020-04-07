// Services
import React, { useState } from 'react';

// Components
import {
  Button,
  Dialog,
  DialogContent,
  Typography
} from '@material-ui/core';

import DetailsCollapse from '../../components/CustomCollapse/Details-Collapse';
import ParamsCollapse from '../../components/CustomCollapse/Params-Collapse';
import InfoCollapse from '../../components/CustomCollapse/Info-Collapse';


export default ({ asset }) => {
  const [open, setOpen] = useState(false);

  const handleModal = () => {
    open ? setOpen(false) : setOpen(true);
  };

  return (
    <React.Fragment>
      <Button variant='outlined' onClick={handleModal}>Details</Button>
      <Dialog open={open} onClose={handleModal}>
        <DialogContent style={{ width: 550 }}>
          <Typography variant="h4">{`${asset.name}`}</Typography>
          <DetailsCollapse details={asset.details} />
          <ParamsCollapse restrict={asset.restrict} />
          <InfoCollapse props={asset} />
        </DialogContent>
      </Dialog>
    </React.Fragment>
  )
}
