/**
* 一些 server 和 client 都需要的数据
*  <>-----}|------------------------------->
* 
*/
import { SsrUpdate, user } from '../../common/actionType'
import Immutable from 'immutable';

const initialState = Immutable.fromJS({
    /**leftMenu */l: {
        /*openedKeys*/o: [],
        /*selectedKey*/s: '',
        /*title*/t: '首页',
        /**collapsed */c: false,
    },
    /**usertoken */u: ''
})

export default (state = initialState, { type, payload }) => {
    // 这个是 通过 创建store 传入的
    if (state != initialState && !state.toJS) {
        state = Immutable.fromJS(state)
    }
    switch (type) {
        case SsrUpdate: {
            Object.keys(payload).forEach(k => {
                state = state.mergeIn([k], payload[k])
            })
            return state;
        }
        case user.UserLoginSucc: {
            return state = state.set('u', payload.result.token)
        }
    }
    return state;
}

