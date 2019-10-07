//
//
//
const styles = {
    snackbars: {
        error: {
            variant: 'error',
            anchorOrigin: { vertical: 'bottom', horizontal: 'right', },
            autoHideDuration: 3000,
        },
        success: {
            variant: 'success',
            anchorOrigin: { vertical: 'bottom', horizontal: 'left', },
            autoHideDuration: 2000,
        },
        comingSoon: {
            anchorOrigin: { vertical: 'top', horizontal: 'center', },
            autoHideDuration: 3000,
        },
        addToIPFS: {
            variant: 'info',
            anchorOrigin: { vertical: 'top', horizontal: 'center', },
        },
        completeAddToIPFS: {
            autoHideDuration: 1000,
            variant: 'success',
            anchorOrigin: { vertical: 'top', horizontal: 'center', },
        },
    }
}


let { error, success, comingSoon, completeAddToIPFS, addToIPFS } = styles.snackbars
const presets = {
    success: (enqueueSnackbar, text) => enqueueSnackbar(text, success),
    error: (enqueueSnackbar, text) => enqueueSnackbar(text, error),
    comingSoon: (enqueueSnackbar, text) => enqueueSnackbar(text, comingSoon),
    addToIPFS: (enqueueSnackbar, text) => enqueueSnackbar(text, addToIPFS),
    completeAddToIPFS: (enqueueSnackbar, text) => enqueueSnackbar(text, completeAddToIPFS),
}

export default (varient, message) => {
  switch (varient) {
    case 'success':
      presets.success(this.props.enqueueSnackbar, message)
      break;
    case 'error':
      presets.error(this.props.enqueueSnackbar, message)
      break;
    case 'addToIPFS':
      presets.addToIPFS(this.props.enqueueSnackbar, message)
      break;
    default:
      presets.comingSoon(this.props.enqueueSnackbar, message)
      break;
  }
}


