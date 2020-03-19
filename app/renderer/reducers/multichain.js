import { address_permissions} from '../constants/multichain/Permissions';
// Multichain data collection
export const getInfo = (multichain, setState) => {
    multichain.getInfo((err, res) => {
        err ? setState([]) : setState(res)
    })
}
export const getBlockchainParams = (multichain, setState) => {
    multichain.getBlockchainParams((err, res) => {
        err ? setState([]) : setState(res);
    });
}
export const listAddresses = (multichain, setState) => {
    multichain.listAddresses((err, res) => {
        err ? setState([]) : setState(res);
    });
}
export const listPermissions = (multichain, setState) => {
    multichain.listPermissions((err, res) => {
        if (err) {
            setState({});
            return;
        }
        let obj = {}
        address_permissions.map(key => {
            obj[key] = res.filter(val => val.type === key)
        })
        let values = Object.values(obj);
        let sorted_permissions = {};
        address_permissions.map((key, i) => {
            sorted_permissions[key] = values[i].map(val => val.address)
        })
        setState(sorted_permissions);
    });
}
export const listAssets = (multichain, setState) => {
    multichain.listAssets((err, res) => {
        err ? setState([]) : setState(res);
    });
}
export const getPeerInfo = (multichain, setState) => {
    multichain.getPeerInfo((err, res) => {
        err ? setState([]) : setState(res);
    });
}
export const listStreams = (multichain, setState) => {
    multichain.listStreams((err, res) => {
        err ? setState([]) : setState(res);
    });
}