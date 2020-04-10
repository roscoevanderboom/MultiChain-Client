// Services
import React, { useState, useEffect } from 'react';
// Components
import { ListItemText } from '@material-ui/core';
import Collapse from '../CustomCollapse';

export default (props) => {
    const { data, title, containerStyles, listItemStyles } = props;
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
            <div className={containerStyles}>
                {dataKeys.map((key, i) =>
                    <ListItemText
                        key={i}
                        primary={key}
                        secondary={`${dataValues[i]}`}
                        classes={{
                            multiline: listItemStyles
                        }} />
                )}
            </div>
        </Collapse>
    )
}