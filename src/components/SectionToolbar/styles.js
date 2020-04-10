// Styles
import makeStyles from "@material-ui/core/styles/makeStyles";
import { flex_center_row } from '../../assets/jss/material-kit-react';

const useStyles = makeStyles({
    toolbar: {
        ...flex_center_row,
        justifyContent: 'space-evenly',
        margin: '20px 0px'
    },
    itemsLeft: {
        ...flex_center_row,
        justifyContent: 'flex-start'
    },
    itemsCenter: {
        ...flex_center_row,
        justifyContent: 'center',
        padding: '0px 12px'
    },
    itemsRight: {
        ...flex_center_row,
        justifyContent: 'flex-end'
    },

})

export default useStyles;