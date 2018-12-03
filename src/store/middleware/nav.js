// 返回的过度动画

export default store => next => (action) => {
    next(action)
    if (action.type == 'NavBack' || action.type == 'NavTo') {
        setTimeout(() => {
            store.dispatch({
                type: 'NavEnd',
                payload: action.payload
            })
        }, 250)
    }
}