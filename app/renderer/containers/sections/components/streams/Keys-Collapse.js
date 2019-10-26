// Services
import React, { useState, useEffect } from 'react';

import CollapseArray from '../../../components/Collapse-Array'

export default ({ keys }) => {
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
