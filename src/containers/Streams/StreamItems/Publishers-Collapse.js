// Services
import React, { useState, useEffect } from 'react';

import CollapseArray from '../../../components/CustomCollapse/Collapse-Array'

const PublishersCollapse = ({ publishers }) => {
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

export default PublishersCollapse;