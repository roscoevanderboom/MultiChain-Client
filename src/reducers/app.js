const reducer = (state, action) => {
    const { type, data } = action;

    switch (type) {
        case 'SET_TITLE':
            return { ...state, title: data }
        case 'SET_USER':
            return { ...state, user: data }
        case 'SET_MODAL':
            return { ...state, modals: { ...state.modals, [data]: state.modals[data] ? false : true } }
        default:
    }
}

export default reducer;