// Styles
import { makeStyles } from '@material-ui/core/styles';
import {
    defaultFont, flex_center_column, link
} from '../../assets/jss/material-kit-react';
const useStyles = makeStyles({
    body: {        
        ...flex_center_column,
        paddingTop: 80
    },
    text: {
        ...defaultFont,
        padding: 5
    },
    listItemText: {
        flex: 0
    },
    actions: {
        ...flex_center_column,
        width: '50%',
        marginTop: 20
    },
    link: {
        ...link
    }
})

export default useStyles;