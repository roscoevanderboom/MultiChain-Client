//
import React from 'react';

// Components
import {
  Switch
} from '@material-ui/core';


const defaultStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
}

const CustomSwitch = ({ switchValue, handleClick, checkedValue, style }) => {

  return (
    <div style={style === undefined ? defaultStyle : style}>
      <p>{switchValue}</p>
      <Switch
        value={switchValue}
        onClick={handleClick}
        color='primary'
        checked={checkedValue}
        inputProps={{ 'aria-label': 'primary checkbox' }}
      />
    </div>
  );
}

export default CustomSwitch;