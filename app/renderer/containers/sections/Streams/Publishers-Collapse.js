// Services
import React, { useState, useEffect } from 'react';

import CollapseArray from '../../../components/CustomCollapse/Collapse-Array'

export default ({ publishers }) => {
  const [dataValues, setDataValues] = useState([]);
  useEffect(() => {
    if (publishers) {
      setDataValues(publishers);
    }
  }, [publishers])
  return (
    <CollapseArray  name={'Publishers'}  props={dataValues}/>
  )
}
