// Services
import React, { useState, useEffect } from 'react';

import Collapse from '../../components/Collapse';

export default ({ restrict }) => {

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
