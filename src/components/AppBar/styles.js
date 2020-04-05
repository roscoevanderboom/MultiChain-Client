// Styles
import { appBarMargin, title } from '../../assets/jss/material-kit-react';
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
        ...title,
        margin: `0px 0px 0px 12px`,
        color: 'white'
    }
})

export default useStyles;