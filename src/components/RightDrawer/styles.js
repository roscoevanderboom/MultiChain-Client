import { makeStyles } from '@material-ui/core/styles';
import {flex_center_column} from '../../assets/jss/material-kit-react';
const useStyles = makeStyles({
    list: {
        width: 250,
    },    
    appBarIcon: {
        color: 'white'
    },
    listItemText: {
        textDecoration: 'none',
        color: 'black'
    },
    buttonContainer:{
        ...flex_center_column,
        padding: 10
    }
});
export default useStyles;