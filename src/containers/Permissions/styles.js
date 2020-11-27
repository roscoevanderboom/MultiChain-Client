// Styles
import { makeStyles } from '@material-ui/core/styles';
import { defaultFont } from '../../assets/jss/material-kit-react';

const useStyles = makeStyles({
    title: {
        fontSize: '1.5em',
        ...defaultFont,
        paddingTop: 25,
    }
})

export default useStyles;