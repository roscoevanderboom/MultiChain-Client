// Services
import React from 'react';

// Components
import {
  Card,
  CardContent,
} from '@material-ui/core';

import DetailsCollapse from './Details-Collapse';
import InfoCollapse from './Info-Collapse';
import PublishersCollapse from './Publishers-Collapse';
import KeysCollapse from './Keys-Collapse';

// Style
const style = {
  card: {
    border: 'solid 1px black',
    margin: 5,
  },
}

export default ({ item }) => {
  return (
    <Card raised={true} style={style.card}>
      <CardContent>
        <DetailsCollapse details={item.data} />
        <InfoCollapse props={item} />
        <PublishersCollapse publishers={item.publishers} />
        <KeysCollapse keys={item.keys} />
      </CardContent>
    </Card>
  )
}
