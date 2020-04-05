// Styles
import { makeStyles } from '@material-ui/core/styles';
import {
    defaultFont, flex_center_row
} from '../../assets/jss/material-kit-react';

const button = {
    color: 'white'
}
const useStyles = makeStyles({
    title: {
        ...defaultFont,
        ...flex_center_row,
        padding: '4px 10px',
    },
    windowControl: {
        ...flex_center_row,
    },
    minimizeBtn: {
        ...button,
    },
    closeBtn: {
        ...button,
        ...flex_center_row
    }

})
export default useStyles;