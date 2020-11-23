export const revoke = ({ multichain, reducers, address, name, listAddresses, listPermissions }) => {
    multichain.revoke({ addresses: address.address, permissions: name },
        (err, res) => {
            if (err) {
                reducers.feedback('error', err.message);
                return;
            }
            listAddresses(multichain, reducers)
            listPermissions(multichain, reducers)
        })
}

export const grant = ({ multichain, reducers, address, name, listAddresses, listPermissions }) => {
    multichain.grant({ addresses: address.address, permissions: name },
        (err, res) => {
            if (err) {
                reducers.feedback('error', err.message);
                return;
            }
            listAddresses(multichain, reducers)
            listPermissions(multichain, reducers)
        })
}