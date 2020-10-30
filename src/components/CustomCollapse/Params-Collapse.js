// Services
import React, { useState, useEffect } from 'react';

import Collapse from './Collapse';

const ParamsCollapse = ({ restrict }) => {

  const [dataKeys, setDataKeys] = useState([]);
  const [dataValues, setDataValues] = useState([]);

  useEffect(() => {
    if(restrict) {
      setDataKeys(Object.keys(restrict));
      setDataValues(Object.values(restrict));
    }
  }, [restrict])

  return (
    <Collapse name={'Restrictions'} props={{ dataKeys, dataValues }} />
  )
}

export default ParamsCollapse;