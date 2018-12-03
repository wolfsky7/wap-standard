/**
 * 可能有些数据 需要 服务端 和 客户端 共享
 */

import Immutable from 'immutable'
import diff from '../../libs/tools/diff'
import cookie from '../../libs/tools/cookie'

const _cookieKey = "_store_"

let _ts = null;

export default (whiteList = [], key = _cookieKey) => store => next => action => {
    let last = store.getState();
    next(action);
    let now = store.getState();

    let isChanged = false, ns = {};
    whiteList.forEach(k => {
        ns[k] = now[k].toJS ? now[k].toJS() : now[k]
        if (!Immutable.is(last[k], now[k])) {
            isChanged = true;
        }
    })

    if (isChanged) {
        if (_ts) {
            clearTimeout(_ts);
        }
        _ts = setTimeout(() => {
            cookie.setItem(key, JSON.stringify(ns))
            _ts = null;
        }, 20);

    }
}

const getPreloadState = (rawCookie, key = _cookieKey) => {
    let raw = cookie.getItem(key, rawCookie)
    if (raw) {
        try {
            raw = JSON.parse(raw)
            return raw;
        }
        catch (err) {
            console.error(err)
        }
    }
    return undefined;
}

export {
    getPreloadState
}