

export default (variant, message, enqueueSnackbar) => {
  switch (variant) {
    case 'success':
      enqueueSnackbar(message, {
        variant, autoHideDuration: 2000
      });
      break;
    default:
      enqueueSnackbar(message, {
        variant
      });
      break;
  }
};
