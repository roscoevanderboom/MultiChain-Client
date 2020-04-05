// Styles
import { makeStyles } from '@material-ui/core/styles';
import {
    defaultFont, flex_center_column
  } from '../../assets/jss/material-kit-react';
  const useStyles = makeStyles({
    body: {
      ...flex_center_column
    },
    text: {
      ...defaultFont,
      padding: 5
    },
    actions: {
      ...flex_center_column,
      justifyContent: 'space-around',
      width: '50%',
      marginTop: 20
    }
  })

export default useStyles;