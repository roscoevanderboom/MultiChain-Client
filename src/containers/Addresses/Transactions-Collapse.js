// Services
import React, { useEffect, useContext, useState } from 'react';
import { store } from '../../store';
// Components
import { ListItemText, List } from '@material-ui/core'
import Collapse from '../../components/CustomCollapse';
import InfoCollapse from '../../components/CustomCollapse/Collapse-Object';
// Styles
import useStyles from './styles';

const TransactionCollapse = ({ address }) => {
    const { state, reducers } = useContext(store);
    const classes = useStyles();
    const [transactions, setTransactions] = useState([]);

    const listAddressTransactions = async () => {
        let addressTransactions = await state.multichain.listAddressTransactions(address)
            .catch((err) => { reducers.feedback('error', err.message) })
        setTransactions(addressTransactions);
    }

    useEffect(() => {
        listAddressTransactions();
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