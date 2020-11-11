// Styles
import { makeStyles } from '@material-ui/core/styles';
import { defaultBoxShadow, defaultFont, collapseContainer } from '../../assets/jss/material-kit-react';

const useStyles = makeStyles({
    title: {
        fontSize: '1.5em',
        ...defaultFont,
        cursor: 'pointer',
        paddingLeft: 20,
    },
    streamCardDiv: {
        padding: '0px 5px'
    },
    listItem: {
        paddingLeft: 20,
        paddingTop: 0,
        paddingBottom: 0,
        transition: 'all 0.5s',
        '&:hover': {
            ...defaultBoxShadow,
        }
    },
    bullet: {
        display: 'flex',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    collapseContainer: {
        ...collapseContainer
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
    },
    red: {
        backgroundColor: 'red'
    }
})

export default useStyles;