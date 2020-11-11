
export const app = {
    user: '',
    title: '',
    modals: {
        CreateChain: false,
        ConnectRemote: false,
        SendAsset: false
    }
}

export const mc_state = {
    title: '',
    chain_credentials: [],
    localPaths: {},
    localChains: [],
    multichain: false,
    chainInfo: false,
    addresses: false,
    params: false,
    permissions: false,
    peers: false,
    assets: false,
    streams: false,
    currentStream: false,
    currentAsset: false,
}

export const stream_state = {
    currentStream: '',
    streamKeys: [],
    streamPublishers: [],
    streamItems: [],
}
