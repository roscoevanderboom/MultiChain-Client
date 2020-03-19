// Styles
import { makeStyles } from '@material-ui/core/styles';
import {
    defaultFont, defaultBoxShadow, primaryGradient,
    flex_center_row
} from '../../assets/jss/material-kit-react';
const useStyles = makeStyles({
    gridItem: {
        ...defaultFont
    },
    card: {
        ...defaultBoxShadow,
        margin: 12,
        backgroundColor: 'whitesmoke'
    },
    cardHeader: {
        ...flex_center_row
    },
    cardTitle: {
        ...primaryGradient,
        ...defaultBoxShadow,
        color: 'white',
        width: '75%'
    }
})

export default useStyles;