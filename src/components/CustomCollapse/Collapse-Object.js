// Services
import React, { useState, useEffect } from 'react';
// Components
import { ListItemText } from '@material-ui/core';
import Collapse from '../CustomCollapse';

const CollapseObject = (props) => {
    const { data, title, containerstyles, listitemstyles } = props;
    const [dataKeys, setDataKeys] = useState([]);
    const [dataValues, setDataValues] = useState([]);

    const handleObject = () => {
        let propkeys = Object.keys(data);
        let propvalues = Object.values(data);
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
        handleObject()
        // eslint-disable-next-line
    }, [props])

    return (
        <Collapse {...props} title={title}>
            <div className={containerstyles}>
                {dataKeys.map((key, i) =>
                    <ListItemText
                        key={i}
                        primary={key}
                        secondary={`${dataValues[i]}`}
                        classes={{
                            multiline: listitemstyles
                        }} />
                )}
            </div>
        </Collapse>
    )
}

export default CollapseObject;