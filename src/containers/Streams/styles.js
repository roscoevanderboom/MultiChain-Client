// Styles
import { makeStyles } from '@material-ui/core/styles';
import { defaultBoxShadow, flex_center_column } from '../../assets/jss/material-kit-react';
import {
    title
} from '../../assets/jss/material-kit-react';
const useStyles = makeStyles({
    title: {
        ...title,
        paddingTop: 20,
        fontSize: '1.5em'
    },
    card: {
        margin: 5,
        ...flex_center_column,
        ...defaultBoxShadow
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    pos: {
        marginBottom: 12,
    },
    filters: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column'
    },
    select: {
        padding: 3
    },
    streamItem: {
        padding: 12,
        minWidth: 595
    },
    paperWidthSm: {
        maxWidth: 1000,
        width: '90%'
    },
    scrollPaper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    keysDiv: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    btn: {
        marginLeft: 4
    }
})

export default useStyles;