import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// Components
import { ListItem } from '@material-ui/core';
// Styles
import { makeStyles } from '@material-ui/core/styles';
import { defaultFont } from '../../assets/jss/material-kit-react';

const useStyles = makeStyles({
  navLink: {
    textDecoration: 'none',
    color: 'black' ,
    width: '100%'   
  },
  text: {
    ...defaultFont,
    fontSize: '1.2rem',
    paddingLeft: 15,
  }
});

export default ({ section }) => {
  const classes = useStyles();

  return (
    <Link to={`${section}`}
      className={classes.navLink}>
      <ListItem button
      className={classes.text}>
        {section}
      </ListItem>
    </Link>

  )
};
