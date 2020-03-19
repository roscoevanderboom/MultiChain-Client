// Styles
import { appBarMargin, defaultFont } from '../../assets/jss/material-kit-react';
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles({
    appBar: {
        ...appBarMargin,
    },
    appBarLeftDiv: {
        display: 'flex',
        alignItems: 'center'
    },
    title: {
        ...defaultFont,
        marginLeft: 12
    }
})

export default useStyles;