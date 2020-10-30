// Services
import React, { useState } from 'react';

// Components
import {
  Typography, Button, TextField, Grid, MenuItem
} from '@material-ui/core';

const KeyItems = ({ streamKeys, keys, setKeys, style }) => {
  const [select, setSelect] = useState('')

  const handleSetKey = (e) => {
    setSelect(e.target.value);
    if (e.target.value === 'all') {
      setKeys(streamKeys.map(key => key.key));
      return;
    }
    setKeys([...keys, e.target.value]);
  }
  const handleRemoveKey = (e) => {
    let newKeys = keys.filter(key => key !== e.target.textContent)
    setKeys(newKeys);
  }

  return (
    <React.Fragment>
      <Typography variant="h6" component="h6">
        Keys:
      </Typography>
      <Grid container>
        <Grid item xs={4}>
          <TextField
            select
            value={select}
            fullWidth
            className={style.select}
            helperText={'Search by key'}
            onChange={handleSetKey}>
            <MenuItem value={'all'}>All keys</MenuItem>
            {streamKeys.map((key, i) =>
              <MenuItem
                key={i}
                value={key.key}>
                {key.key}
              </MenuItem>
            )}
          </TextField>
        </Grid>
        <Grid item xs={8}>
          <div className={style.keysDiv}>
            {keys.map(key =>
              <Button
                key={key}
                className={style.btn}
                variant='outlined'
                onClick={handleRemoveKey}
                children={key} />)}
          </div>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}
export default KeyItems;