
import React, { useState, useEffect } from 'react';

export default ({ option, handleClick, value }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleMenuItemClick = (event, index, option) => {
    handleClick(index, option, name)
    setSelectedIndex(index);

  };

  useEffect(() => {
    multichain.listPermissions({ permissions: option }, (err, res) => {
      if (err) {
        console.log(err)
        return;
      }
      let perm = res.map(val => val.address)
      if (perm.includes(address.address)) {
        console.log(`This address has ${option} permission`)
        return;
      }
    })
  }, [input])


  return (
    <MenuItem
      style={{ display: 'flex', justifyContent: 'space-between' }}
      key={option}
      selected={index === selectedIndex}>
      {option}
      {<Switch
        onClick={event => handleMenuItemClick(event, index, option)}
        value={value}
      />}
    </MenuItem>
  )
}

