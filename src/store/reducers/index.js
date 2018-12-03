import { combineReducers } from 'redux'

import user from './user'
import loading from './loading'
import ssr from './ssr'
import nav from './nav'


export default combineReducers({
    user, loading, ssr, nav
})