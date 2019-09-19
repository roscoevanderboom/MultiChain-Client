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
export default {
    success: (enqueueSnackbar, text) => enqueueSnackbar(text, success),
    error: (enqueueSnackbar, text) => enqueueSnackbar(text, error),
    comingSoon: (enqueueSnackbar, text) => enqueueSnackbar(text, comingSoon),
    addToIPFS: (enqueueSnackbar, text) => enqueueSnackbar(text, addToIPFS),
    completeAddToIPFS: (enqueueSnackbar, text) => enqueueSnackbar(text, completeAddToIPFS),
}
