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
    }
}

export default reducer;

export const selectStream = (stream, reducers) => {
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

export const subscribe = (multichain, reducers) => {

}

export const unsubscribe = (multichain, reducers) => {

}
