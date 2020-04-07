// Services
import React, { useState } from 'react';

// Components
import {
  Typography, MenuItem, TextField, Grid
} from '@material-ui/core';

export default ({ streamPublishers, listStreamPublisherItems, style }) => {
  const [value, setValue] = useState('')

  const pubsearch = (e) => {
    listStreamPublisherItems(e.target.value)
    setValue(e.target.value)
  }
  return (
    <React.Fragment>
      <Typography variant="h6" component="h6">
        Publishers:
      </Typography>
      <Grid container>
        <TextField
          select
          value={value}
          fullWidth
          onChange={pubsearch}
          className={style.select}
          helperText={'Search by publisher'}>
          <MenuItem value={'all'}>All publishers</MenuItem>
          {streamPublishers.map((pub, i) =>
            <MenuItem
              value={pub.publisher}
              key={i}>
              {pub.publisher}
            </MenuItem>
          )}
        </TextField>
      </Grid>
    </React.Fragment>
  )
}
