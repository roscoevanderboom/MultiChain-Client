import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
    },
    noLabel: {
        marginTop: theme.spacing(3),
    },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

export default function MultipleSelect({ streamPublishers, pub, setPub }) {
    const classes = useStyles();

    const handleChange = (event) => {
        setPub(event.target.value);
    };

    return (
        <div>
            <FormControl fullWidth className={classes.formControl}>
                <InputLabel id="pubsearch">Publisher search</InputLabel>
                <Select
                    labelId="pubsearch"
                    id="pubsearch-select"
                    value={pub}
                    onChange={handleChange}
                    input={<Input />}
                    MenuProps={MenuProps}
                >
                    {streamPublishers.map((name, i) => (
                        <MenuItem key={i} value={name.publisher} >
                            {name.publisher}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}