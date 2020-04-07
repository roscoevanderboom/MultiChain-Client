// Styles
import { makeStyles } from '@material-ui/core/styles';
import { sectionTitle, flex_center_column } from '../../assets/jss/material-kit-react';
const useStyles = makeStyles({
    sectionTitle: {
        ...sectionTitle
    },
    gridItem: {
        padding: '5px 12px'
    },
    listItemText: {
        ...flex_center_column
    }
})

export default useStyles;