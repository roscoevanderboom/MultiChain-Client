// Styles
import { makeStyles } from '@material-ui/core/styles';
import { flex_center_row } from '../../assets/jss/material-kit-react';
const useStyles = makeStyles({
    mainRaised: {
        ...flex_center_row,
        flexWrap: 'wrap',
        borderRadius: "6px",
        backgroundColor: 'white',
        boxShadow:
            "0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)"
    },
    largeCards: {
        overflowY: 'scroll',
        maxHeight: 450,
        marginTop: 15
    },
    text: {
        textAlign: 'center'
    },
    body: {
        margin: '115px 50px 0px 50px'
    }
})

export default useStyles;