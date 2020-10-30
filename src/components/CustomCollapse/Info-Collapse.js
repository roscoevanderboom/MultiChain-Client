// Services
import React, { useState, useEffect } from 'react';

import Collapse from './Collapse';

const InfoCollapse = ({ props }) => {

  const [dataKeys, setDataKeys] = useState([]);
  const [dataValues, setDataValues] = useState([]);

  const handleList = () => {
    let propkeys = Object.keys(props);
    let propvalues = Object.values(props);
    let keys = [];
    let values = [];

    propvalues.forEach((val, i) => {
      if (typeof (val) === 'string' || typeof (val) === 'boolean' || typeof (val) === 'number') {
        values.push(val);
        keys.push(propkeys[i]);
        return;
      }
    })
    setDataKeys(keys);
    setDataValues(values);
  }

  useEffect(() => {
    handleList()
    // eslint-disable-next-line
  }, [props])

  return (
    <Collapse name={'Item Info'} props={{ dataKeys, dataValues }} />
  )
}

export default InfoCollapse;