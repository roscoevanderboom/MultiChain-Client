// Services
import React, { useEffect, useContext } from 'react';
// State
import { GlobalState } from '../../../state';
// Constants
import { address_permissions } from '../../../constants/Permissions';
// Components
import {
  Card, Grid, Typography,
  Paper, ListItemText
} from '@material-ui/core';

// Styles
import {
  defaultFont, boxShadow,
  flex_center_column, primaryGradient
} from '../../../css/jss/material-kit-react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    ...flex_center_column
  },
  paper: {
    ...boxShadow,
    ...defaultFont,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  container: {
    ...flex_center_column
  },
  card: {
    padding: 12,
    margin: 12,
    ...boxShadow,
    ...flex_center_column
  },
  cardTitle: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 6,
    width: '50%',
    color: 'white',
    fontWeight: 600,
    ...primaryGradient,
    ...boxShadow,
  }
}));

export default () => {
  const styles = useStyles();
  const { state } = useContext(GlobalState);
  const { permissions } = state;

  return (permissions &&
    <div className={styles.root}>
      <Grid item md={10} lg={8}>
        <Paper className={styles.paper}>
          <Grid
            justify='center'
            container
            spacing={3}>
            {address_permissions.map(permission =>
              <Grid item sm={12} md={6}>
                <Card className={styles.card}>
                  <Typography className={styles.cardTitle}>
                    {permission.toUpperCase()}
                  </Typography>
                  <div>
                    {permissions[permission].map(value =>
                      <ListItemText>
                        {value}
                      </ListItemText>
                    )}
                  </div>
                </Card>
              </Grid>
            )}
          </Grid>
        </Paper>
      </Grid>
    </div>
  );
};