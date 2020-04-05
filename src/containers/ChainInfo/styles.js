// Styles
import { makeStyles } from '@material-ui/core/styles';
import {
    title, sectionTitle
} from '../../assets/jss/material-kit-react';
const useStyles = makeStyles({
    sectionTitle: {
        ...sectionTitle
    },
    gridContainer:{
        padding: '5px 12px'
    }
})

export default useStyles;