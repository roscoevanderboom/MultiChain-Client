// Services
import React, { useState, useEffect } from 'react';

import Collapse from './Collapse';

const DetailsCollapse = ({ details }) => {

  const [dataKeys, setDataKeys] = useState([]);
  const [dataValues, setDataValues] = useState([]);

  const handleJSON = (jsonValues) => {
    if (!jsonValues.includes('"')) {
      return;
    }

    let obj = {
      keys: Object.keys(JSON.parse(jsonValues)),
      values: Object.values(JSON.parse(jsonValues))
    };
    setDataKeys(obj.keys);
    setDataValues(obj.values)
  }
  const handleDetails = () => {
    let obj = {
      keys: Object.keys(details),
      values: Object.values(details)
    }
    obj.keys.forEach((key, i) => {
      if (key === 'json') {
        handleJSON(obj.values[0])
        return;
      }

      setDataKeys(obj.keys);
      setDataValues(obj.values)
    })
  }

  useEffect(() => {
    if (details) {
      handleDetails()
    }
    // eslint-disable-next-line
  }, [details])


  return (
    <Collapse name={'Details'} props={{ dataKeys, dataValues }} />
  )
}

export default DetailsCollapse;