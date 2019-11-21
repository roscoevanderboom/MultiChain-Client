// Services
import React, { useState, useEffect, useContext } from 'react';

// Components
import {
  Typography, MenuItem, TextField
} from '@material-ui/core';

export default ({ streamKeys, listStreamKeyItems, style }) => {
  const [value, setValue] = useState(false)
  const keysearch = (e) => {
    listStreamKeyItems(e.target.value);
    setValue(e.target.value);
  }

  return (
    <React.Fragment>
      <Typography variant="h6" component="h6">
        Keys:
      </Typography>
      <TextField
        select
        value={value}
        style={style.select}
        helperText={'Search by key'}
        onChange={keysearch}>
        <MenuItem value={'all'}>All keys</MenuItem>
        {streamKeys.map((key, i) =>
          <MenuItem
            value={key.key}
            key={i}>
            {key.key}
          </MenuItem>
        )}
      </TextField>
    </React.Fragment>
  )
}
