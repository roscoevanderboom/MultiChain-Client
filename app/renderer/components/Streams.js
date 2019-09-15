// Services
import React from 'react';

// Constants

// Components
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

// Modal
import CreateStream from '../Modals/CreateStream'

// Styles
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
  },
  body: {

  },
  newStreamBtn: {
    marginLeft: 30
  },
  card: {
    margin: '10px 10px'
  }
}));

export default function Streams({ props }) {

  const classes = useStyles();

  const { state } = props;
  const { streams } = state;

  console.log(streams)

  if (streams.length !== 0) {
    const names = streams.map(stream => stream.name);
    const details = streams.map(stream => stream.details.text);
    const restrictions = streams.map(stream => stream.restrict);
    console.log(restrictions);
  }


  return (
    <React.Fragment>
      <Paper className={classes.root}>
        <Typography variant="h5" component="h3">
          Streams
          <CreateStream props={props} />
        </Typography>
        <div className={classes.body}>
          {streams.map((stream) =>
            <Card className={classes.card} key={stream.name}>
              <CardContent>
                <Typography gutterBottom>
                  Name: {stream.name}
                </Typography>
                <Typography variant="body2" component="p">
                  Details: {stream.details.text}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" variant='outlined'>
                  {stream.subscribed ? 'Unsubscribe' : 'Subscribe'}
                </Button>
              </CardActions>
            </Card>
          )}
        </div>
      </Paper>
      <Divider />
    </React.Fragment>
  );
}
