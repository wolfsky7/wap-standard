import '../mock';
import apiFetch, { ReqCacheType, ReqConfig } from '../../libs/tools/api'
import { ApiServer } from '../../common/constant'
import { Loading } from '../../common/actionType'

export const CallApi = "CallApi"

const showLoading = (loading, next) => {
    next({
        type: Loading,
        payload: loading
    })
}

export default store => next => (action) => {
    const { type, payload } = action;
    if (type != CallApi) {
        return next(action);
    }


    let {
        loading = true,
        success,
        fail,
        cache = ReqCacheType.NO_CACHE,
        requestOnlyWhen,
        done,
        api,
        needAuth = true,
        ...others
    } = payload;


    let url = api.toString();
    url = /http/.test(url) ? url : (ApiServer + url)

    // 带入token
    if (needAuth) {
        let token = store.getState().user.get('token')
        if (!token) {
            // 或者跳到注册
            throw new Error('还未登录')
        }
        url += (/\?/.test(url) ? '&' : '?') + 'access-token=' + token
    }


    if (api.method) {
        others.method = api.method
    }



    let beforeReq = () => {
        loading && showLoading(true, next)
    }

    let toResult = (tag, rs) => {
        let ty = typeof tag;
        if (ty == "string") {
            next({
                type: tag,
                payload: rs
            })
        }
        else if (ty == "function") {
            tag(rs)
        }
    }

    let afterReq = (err, rs) => {
        loading && showLoading(false, next)

        if (err) {
            toResult(fail, err)
        }
        else if (rs.status != 200) {
            toResult(fail, rs)
        }
        else {
            toResult(success, rs)
        }

        toResult(done, null)
    }

    beforeReq()
    try {
        apiFetch(url, others).then(rs => {
            afterReq(null, rs)
        }).catch(err => {
            afterReq(err, null)
        })
    }
    catch (err) {
        console.log(err)
        afterReq(err, null)
    }



}