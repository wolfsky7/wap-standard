import Immutable from 'immutable'
import { user } from '../../common/actionType'

const initialState = Immutable.fromJS({
    token: '',
    userInfo: {

    }
})


export default (state = initialState, { type, payload }) => {
    switch (type) {
        case user.UserRefresh: {
            return state.mergeIn(['userInfo'], payload.result.user)
        }
        case user.UserLoginSucc: {
            state = state.set('token', payload.result.token);
            return state.mergeIn(['userInfo'], payload.result.user)
        }
    }
    return state;
}