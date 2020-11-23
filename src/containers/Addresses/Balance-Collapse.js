// Services
import React, { useEffect, useContext, useState } from 'react';
import { store } from '../../store';
// Reducers
import { getAddressBalances } from '../../reducers/addresses';
// Components
import { Grid, ListItemText, ListItem } from '@material-ui/core';
import Collapse from '../../components/CustomCollapse';

// Styles
import useStyles from './styles';

const BalanceCollapse = ({ address }) => {
    const { state, reducers } = useContext(store);
    const { multichain } = state.multichain_state;
    const classes = useStyles();
    const [list, setList] = useState([])
    
    useEffect(() => {
        getAddressBalances({ multichain, address, reducers, setList })
        // eslint-disable-next-line
    }, [address])


    return (
        <Collapse title='Balance'
            className={classes.listItem}
            listitemchildren={
                <ListItemText
                    primary={`Total: ${list.length}`} />
            }>
            {list.map((asset, i) =>
                <ListItem key={i}>
                    <Grid item xs={5}>
                        <ListItemText
                            primary='Name'
                            secondary={asset.name} />
                    </Grid>
                    <Grid item xs={5}>
                        <ListItemText
                            primary='Ref'
                            secondary={asset.assetref} />
                    </Grid>
                    <Grid item xs={2}>
                        <ListItemText
                            primary='Quantity'
                            secondary={asset.qty} />
                    </Grid>
                </ListItem>
            )}
        </Collapse>
    )
}
export default BalanceCollapse;