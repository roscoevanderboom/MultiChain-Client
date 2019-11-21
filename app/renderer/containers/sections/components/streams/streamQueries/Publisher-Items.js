// Services
import React, { useState, useEffect, useContext } from 'react';

// Components
import {
  Typography, MenuItem, TextField
} from '@material-ui/core';

export default ({ streamPublishers, listStreamPublisherItems, style }) => {
  const [value, setValue] = useState(false)

  const pubsearch = (e) => {
    listStreamPublisherItems(e.target.value)
    setValue(e.target.value)
  }
  return (
    <React.Fragment>
      <Typography variant="h6" component="h6">
        Publishers:
      </Typography>
      <TextField
        select
        value={value}
        fullWidth
        onChange={pubsearch}
        style={style.select}
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
    </React.Fragment>
  )
}
