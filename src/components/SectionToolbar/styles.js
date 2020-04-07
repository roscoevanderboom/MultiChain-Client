// Styles
import makeStyles from "@material-ui/core/styles/makeStyles";
import { flex_center_row } from '../../assets/jss/material-kit-react';

const useStyles = makeStyles({
    toolbar: {
        ...flex_center_row,
        justifyContent: 'space-evenly'
    },
    itemsLeft: {
        ...flex_center_row,
        justifyContent: 'flex-start'
    },
    itemsCenter: {
        ...flex_center_row,
        justifyContent: 'center'
    },
    itemsRight: {
        ...flex_center_row,
        justifyContent: 'flex-end'
    },

})

export default useStyles;