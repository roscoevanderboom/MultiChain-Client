// Styles
import { makeStyles } from '@material-ui/core/styles';
import {
    defaultFont, primaryGradient, flex_center_column,
    link, body
} from '../../assets/jss/material-kit-react';
const useStyles = makeStyles({
    body: {
        paddingTop: 80,
        ...flex_center_column
    },
    text: {
        ...defaultFont,
        padding: 5
    },
    buttons: {        
        ...primaryGradient,        
    },
    link:{
        ...link
    }
})

export default useStyles;