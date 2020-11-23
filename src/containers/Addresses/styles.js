// Styles
import { makeStyles } from '@material-ui/core/styles';
import { collapseContainer } from '../../assets/jss/material-kit-react';
const useStyles = makeStyles({
    select: {
        paddingTop: 12,
        margin: '0px 6px'
    },
    list: {
        padding: 12,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    listItem: {
        borderTop: 'solid 1px slategrey'
    },
    item: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '20%',
        alignItems: 'center',
        border: 'solid slategrey 1px',
        margin: 1
    },
    span: {
        marginLeft: 15
    },
    badge: {
        backgroundColor: 'black',
        color: 'white',
        fontSize: '1.2rem'
    },
    detailsContainer: {
        ...collapseContainer
    },
    listItemText: {
        border: 'solid 1px slategray',
        borderRadius: 2,
        padding: 5,
        margin: 0
    }
})

export default useStyles;