import { listAddresses } from './multichain';

export const getNewAddress = ({ multichain, reducers }) => {
    multichain.getNewAddress()
        .then((res) => {
            listAddresses(multichain, reducers);
            reducers.feedback('success', 'New address created');
        })
        .catch((err) => {
            reducers.feedback('error', err.message);
        })
}

export const getAddressBalances = async ({ multichain, address, reducers, setList }) => {
    let addressbalances = await multichain.getAddressBalances(address)
        .catch((err) => { reducers.feedback('error', err.message) })
    setList(addressbalances)
}

export const listAddressTransactions = async ({ multichain, address, reducers, setTransactions }) => {
    let addressTransactions = await multichain.listAddressTransactions(address)
        .catch((err) => { reducers.feedback('error', err.message) })
    setTransactions(addressTransactions)
}

export const listWalletTransactions = ({ multichain, reducers }) => {
    multichain.listWalletTransactions({ count: 100 }, (err, res) => {
        if (err) { reducers.feedback('error', err.message) };
        res.map(val => console.log(val.txid))
    })
}