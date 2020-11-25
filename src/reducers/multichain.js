import { address_permissions } from '../constants/multichain/Permissions';
import { add_if_not_included } from '../constants/general';
import getLocalChains from '../constants/multichain/LocalChains';
import getCreds from '../constants/multichain/GetCreds';

// Multichain data collection
export const getInfo = (multichain, reducers) => {
    multichain.getInfo((err, res) => {
        reducers.dispatch_multichain_state({
            type: 'GET_INFO',
            data: err ? false : res
        });
    })
}
export const getBlockchainParams = (multichain, reducers) => {
    multichain.getBlockchainParams((err, res) => {
        reducers.dispatch_multichain_state({
            type: 'GET_PARAMS',
            data: err ? false : res
        });
    })
}
export const listAddresses = (multichain, reducers) => {
    multichain.listAddresses((err, res) => {
        reducers.dispatch_multichain_state({
            type: 'GET_ADDRESSES',
            data: err ? false : res
        });
    });
}
export const listPermissions = (multichain, reducers) => {
    multichain.listPermissions((err, res) => {
        if (res !== undefined) {
            let obj = {}
            address_permissions.forEach(key => {
                obj[key] = res.filter(val => val.type === key)
            })
            let values = Object.values(obj);
            let sorted_permissions = {};
            address_permissions.forEach((key, i) => {
                sorted_permissions[key] = values[i].map(val => val.address)
            })
            reducers.dispatch_multichain_state({
                type: 'GET_PERMISSIONS',
                data: err ? false : sorted_permissions
            });
        }
    });
}
export const listAssets = (multichain, reducers) => {
    multichain.listAssets((err, res) => {
        reducers.dispatch_multichain_state({
            type: 'GET_ASSETS',
            data: err ? false : res
        });
    });
}
export const getPeerInfo = (multichain, reducers) => {
    multichain.getPeerInfo((err, res) => {
        reducers.dispatch_multichain_state({
            type: 'GET_PEERS',
            data: err ? false : res
        });
    });
}
export const listStreams = (multichain, reducers) => {
    multichain.listStreams((err, res) => {
        reducers.dispatch_multichain_state({
            type: 'GET_STREAMS',
            data: err ? false : res
        });
    });
}
export const getChainsList = ({ chainPath, reducers }) => {
    getLocalChains(chainPath)
        .then((chains) => {
            reducers.dispatch_multichain_state({
                type: 'SET_LOCAL_CHAINS_LIST',
                data: chains
            })
        })
        .catch((err) => {
            console.log(err)
        })
}
export const setCredentials = ({ localChains, localPaths, reducers }) => {
    localChains.forEach(chain => {
        getCreds(chain, localPaths.blockchainsPath)
            .then(creds => {
                reducers.dispatch_multichain_state({
                    type: 'SET_CHAIN_CREDENTIALS',
                    data: creds
                })
            })
            .catch((err) => {
                console.log(err)
            })
    });
}
export const collectAllData = (multichain, reducers) => {
    getInfo(multichain, reducers);
    getBlockchainParams(multichain, reducers);
    listAddresses(multichain, reducers);
    listPermissions(multichain, reducers);
    listAssets(multichain, reducers);
    getPeerInfo(multichain, reducers);
    listStreams(multichain, reducers);
}

const multichain_reducer = (state, action) => {
    const { chain_credentials } = state;
    const { type, data } = action;

    switch (type) {
        case 'SET_LOCAL_PATHS':
            return { ...state, localPaths: data }
        case 'SET_LOCAL_CHAINS_LIST':
            return { ...state, localChains: data }
        case 'SET_CHAIN_CREDENTIALS':
            return { ...state, chain_credentials: add_if_not_included(chain_credentials, data) }
        case 'SET_ACTIVE_CHAIN':
            return { ...state, multichain: data }
        case 'GET_INFO':
            return { ...state, chainInfo: data }
        case 'GET_PARAMS':
            return { ...state, params: data }
        case 'GET_ADDRESSES':
            return { ...state, addresses: data }
        case 'GET_PERMISSIONS':
            return { ...state, permissions: data }
        case 'GET_ASSETS':
            return { ...state, assets: data }
        case 'GET_PEERS':
            return { ...state, peers: data }
        case 'GET_STREAMS':
            return { ...state, streams: data }
        default:
    }
}

export default multichain_reducer;