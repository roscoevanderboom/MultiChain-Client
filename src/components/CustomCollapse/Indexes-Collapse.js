// Services
import React, { useState, useEffect } from 'react';

import Collapse from './Collapse';

export default ({ indexes }) => {

  const [dataKeys, setDataKeys] = useState([]);
  const [dataValues, setDataValues] = useState([]);

  useEffect(() => {
    setDataKeys(Object.keys(indexes));
    setDataValues(Object.values(indexes));
  }, [indexes])

  return (
    <Collapse name={'Indexes'} props={{ dataKeys, dataValues }} />
  )
}
