import { execFile } from 'child_process';
import path from 'path';
import { listStreams } from './multichain';

export const createStream = (chainName, options, binaryPath) => {
    const { name, jsonData, restrict } = options;
    const keys = ['write', 'read', 'onchain', 'offchain'];
    let restrictions = '';
    const mcCLI = path.join(binaryPath, 'multichain-cli');

    keys.forEach(key => {
        if (restrict[key] && restrictions === '') {
            restrictions = restrictions.concat(key);
        } else if (restrict[key] && restrictions !== '') {
            restrictions = restrictions.concat(',', key);
        }
    })

    if (!restrict.read && !restrict.write && !restrict.onchain && !restrict.offchain) {
        restrictions = '';
    }

    return new Promise((resolve, reject) => {
        execFile(mcCLI, [
            chainName,
            'create',
            'stream',
            name,
            JSON.stringify({
                restrict: restrictions
            }),
            jsonData
        ], (err, res) => {
            err ? reject(err.message) : resolve(res);
        });
    })
}
export const selectStream = ({ stream, reducers }) => {
    reducers.dispatch_streams({
        type: 'SET_CURRENT_STREAM',
        data: stream
    })
}
export const listStreamItems = ({ multichain, stream, count = 100, reducers }) => {
    multichain.listStreamItems({
        stream: stream.name,
        count: count
    })
        .then(res => reducers.dispatch_streams({
            type: 'SET_ITEMS',
            data: res.reverse()
        }))
        .catch((err) => reducers.dispatch_streams({
            type: 'SET_ITEMS',
            data: []
        }))
}
export const listStreamPublishers = ({ multichain, stream, count = 100, reducers }) => {
    multichain.listStreamPublishers({
        stream: stream.name,
        count: count
    })
        .then(res => reducers.dispatch_streams({
            type: 'SET_PUBLISHERS',
            data: res
        }))
        .catch((err) => reducers.dispatch_streams({
            type: 'SET_PUBLISHERS',
            data: []
        }))
}
export const listStreamKeys = ({ multichain, stream, count = 100, reducers }) => {
    multichain.listStreamKeys({
        stream: stream.name,
        count: count
    })
        .then(res => reducers.dispatch_streams({
            type: 'SET_KEYS',
            data: res
        }))
        .catch((err) => reducers.dispatch_streams({
            type: 'SET_KEYS',
            data: []
        }))
}
export const handleSubscribe = ({ multichain, stream, reducers }) => {
    if (stream.subscribed) {
        multichain.unsubscribe({
            stream: stream.name,
        })
            .then(() => listStreams(multichain, reducers))
            .catch(err => reducers.feedback('error', err.message))
        return;
    }
    multichain.subscribe({
        stream: stream.name,
    })
        .then(() => listStreams(multichain, reducers))
        .catch(err => reducers.feedback('error', err.message))
}
export const publishItems = ({ multichain, stream, address, keys, json, offchain, reducers }) => {
    console.log(json)
    console.log(offchain)
    multichain.publishFrom({
        from: address,
        stream: stream.name,
        key: keys,
        data: {
            json: json
        },
        offchain: offchain
    })
        .then(() => listStreamItems({ multichain, stream, count: 100, reducers }))
        .catch(err => { reducers.feedback('error', err.message) })
}

const reducer = (state, action) => {
    const { type, data } = action;

    switch (type) {
        case 'SET_CURRENT_STREAM':
            return { ...state, currentStream: data }
        case 'SET_KEYS':
            return { ...state, streamKeys: data }
        case 'SET_PUBLISHERS':
            return { ...state, streamPublishers: data }
        case 'SET_ITEMS':
            return { ...state, streamItems: data }
        default:
    }
}

export default reducer;