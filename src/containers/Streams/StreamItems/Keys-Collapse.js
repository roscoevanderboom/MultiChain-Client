// Services
import React, { useState, useEffect } from 'react';

import CollapseArray from '../../../components/CustomCollapse/Collapse-Array'

const KeysCollapse = ({ keys }) => {
  const [dataValues, setDataValues] = useState([]);
  useEffect(() => {
    if (keys) {
      setDataValues(keys);
    }
  }, [keys])
  return (
    <CollapseArray  name={'Keys'}  props={dataValues}/>
  )
}

export default KeysCollapse;