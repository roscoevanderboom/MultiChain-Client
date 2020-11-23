// Services
import React, { useState } from 'react';

// Components
import Collapse from '../../../components/CustomCollapse';
import Button from '../../../components/CustomButtons/Button';
// Material components
import {
  ListItem, ListItemText, Divider
} from '@material-ui/core';
// Style


const ItemDetails = ({ item }) => {
  const { txid, data } = item;

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
      keys: Object.keys(data),
      values: Object.values(data)
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

  React.useEffect(() => {
    handleDetails();
    // eslint-disable-next-line
  }, [])

  return (
    <Collapse title={txid}>
      <ListItem>
        <ListItemText
          primary='Publisher'
          secondary={item.publishers} />
      </ListItem>

      <ListItem>
        <ListItemText
          primary='Keys'
          secondary={
            <React.Fragment>
              {item.keys.map((k, i) =>
                <Button
                  key={i}
                  color='github'
                  size='sm'>
                  {k}
                </Button>
              )}
            </React.Fragment>
          } />
      </ListItem>

      <ListItem>
        {dataKeys.map((k, i) =>
          <ListItemText
            key={i}
            primary={k}
            secondary={dataValues[i]} />
        )}
      </ListItem>
      <Divider />
    </Collapse>
  )
}
export default ItemDetails;