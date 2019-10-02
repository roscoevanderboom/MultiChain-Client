import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


export default function FormDialog({ props }) {
  const [open, setOpen] = React.useState(false);

  const { state, functions } = props;

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }


  const issue = (add, ass, qty) => {
    multichain.issue({
      address: add,
      asset: ass,
      qty: qty,
    }, (err, info) => {
      if (err) throw err;
      console.log(info);
    });
  };

  const createAsset = () => {
    if (!(state.multichain)) {
      functions.feedback('error', 'You are not connected');
      return;
    }
    console.log('set createAsset')
  }

  return (
    <React.Fragment>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        New Asset
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">New Assets</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Create new native assets
          </DialogContentText>
          form

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={createAsset} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
