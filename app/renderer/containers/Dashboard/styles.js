// Styles
import { makeStyles } from '@material-ui/core/styles';
import { flex_center_row } from '../../assets/jss/material-kit-react';
const useStyles = makeStyles({
    paper: {
        ...flex_center_row,
        marginTop: 12,
        flexWrap: 'wrap'
    }
})

export default useStyles;