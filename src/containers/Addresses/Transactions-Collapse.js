// Services
import React, { useEffect, useContext, useState } from 'react';
import { store } from '../../store';
// Reducers
import { listAddressTransactions } from '../../reducers/addresses';
// Components
import { ListItemText, List } from '@material-ui/core'
import Collapse from '../../components/CustomCollapse';
import InfoCollapse from '../../components/CustomCollapse/Collapse-Object';
// Styles
import useStyles from './styles';

const TransactionCollapse = ({ address }) => {
    const { state, reducers } = useContext(store);
    const { multichain } = state.multichain_state;
    const classes = useStyles();
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        listAddressTransactions({ multichain, address, reducers, setTransactions })
        // eslint-disable-next-line
    }, [address])

    return (
        <Collapse title='Transaction History'
            className={classes.listItem}
            listitemchildren={
                <ListItemText
                    primary={`Total: ${transactions.length}`} />
            }>
            <List>
                {transactions.map((transaction, i) =>
                    <InfoCollapse
                        key={i}
                        title={`${transaction.txid}`}
                        data={transaction}
                        containerstyles={classes.detailsContainer}
                        listitemstyles={classes.listItemText} />
                )}
            </List>
        </Collapse>
    )
}
export default TransactionCollapse;