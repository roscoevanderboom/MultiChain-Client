import React from 'react';
import { Button } from '@material-ui/core';

// customized


const Feedback = (variant, message, enqueueSnackbar, closeSnackbar) => {
  const dismiss = key => (
    <React.Fragment>
      <Button onClick={() => closeSnackbar(key)}>
        Dismiss
      </Button>
    </React.Fragment>
  );

  switch (variant) {
    case 'success':
      enqueueSnackbar(message, {
        variant: variant,
        autoHideDuration: 2000
      });
      break;
    case 'error':
      enqueueSnackbar(message, {
        variant: variant,
        action: dismiss,
        persist: true
      });
      break;
    case 'info':
      enqueueSnackbar(message, {
        variant: variant,
        action: dismiss,
        autoHideDuration: 5000
      });
      break;
    case 'warning':
      enqueueSnackbar(message, {
        variant: variant,
        autoHideDuration: 8000,
        preventDuplicate: true,
        action: dismiss
      });
      break;
    default:
      enqueueSnackbar(message);
      break;
  }
};

export default Feedback;