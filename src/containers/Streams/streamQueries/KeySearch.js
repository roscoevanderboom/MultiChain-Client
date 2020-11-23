import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
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

function getStyles(name, keys, theme) {
    return {
        fontWeight:
            keys.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

export default function MultipleSelect({ streamKeys, keys, setKeys }) {
    const classes = useStyles();
    const theme = useTheme();

    const handleChange = (event) => {
        setKeys(event.target.value);
    };

    return (
        <div>
            <FormControl fullWidth className={classes.formControl}>
                <InputLabel id="keysearch">Key search</InputLabel>
                <Select
                    labelId="keysearch"
                    id="keysearch-select"
                    multiple
                    value={keys}
                    onChange={handleChange}
                    input={<Input />}
                    MenuProps={MenuProps}
                >
                    {streamKeys.map((name, i) => (
                        <MenuItem key={i} value={name.key} style={getStyles(name.key, keys, theme)}>
                            {name.key}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}