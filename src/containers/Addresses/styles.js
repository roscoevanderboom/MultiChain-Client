// Styles
import { makeStyles } from '@material-ui/core/styles';
import {
    sectionTitle
} from '../../assets/jss/material-kit-react';
const useStyles = makeStyles({
    sectionTitle: {
        ...sectionTitle
    },
    gridContainer: {
        padding: '5px 12px'
    },
    iframe: {
        height: `-webkit-fill-available`,
        width: `-webkit-fill-available`,
    }
})

export default useStyles;