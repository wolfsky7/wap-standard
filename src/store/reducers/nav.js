import Immutable from 'immutable';
import { Router } from 'next/router'
import { object2Query } from '../../libs/tools/func';
const init = Immutable.fromJS({
    routes: [],
    status: '',
    aimId: '',
    animate: false,
    isNaving: false,
    baseRouteName: '/',
    pages: {}, // 初始传入
})


let id = 0
const genId = (path) => {
    const key = path.replace(/\//g, "-") + "-" + (id++);
    return "navId-" + (key)
}



const pushState = route => {
    return;
    if (process.browser) {
        let url = getParseUrl(route.routeName, route.props)
        history.pushState({ id: route.id, url }, '', url)
    }
}

const replaceState = route => {
    return
    if (process.browser) {
        let url = getParseUrl(route.routeName, route.props)
        history.replaceState({ id: route.id, url }, '', url)
    }
}

const getParseUrl = (path, props) => {
    let str = object2Query(props)

    return str ? path + "?" + str : path;
}

let _hash = 0;

export const popInit = (dispatch) => {
    // return;
    // 监听后退
    if (process.browser) {
        window.addEventListener('load', function () {
            //解决safari的一个bug，safari会在首次加载页面的时候触发 popstate 事件，通过setTimeout 做延迟来忽略这个错误的事件。
            //参考 https://github.com/visionmedia/page.js/pull/239/files
            setTimeout(function () {
                window.addEventListener('popstate', (e) => {
                    //doSomething
                    dispatch({
                        type: 'NavBack',
                        payload: {
                            delta: 1,
                            force: true,
                        }
                    })
                }, false);
            }, 0);
        }, false);
    }

}

const navPush = (state, payload) => {
    const { routeName, props, id, animate = true, createNew = true } = payload;
    let route = state.getIn(['pages', routeName]);
    if (!route || !route.get('component')) {
        return state;
    }

    state = state.merge({
        status: 'NavTo',
        isNaving: true,
        animate: animate,
    })

    let rs = state.get('routes')
    if (createNew == false) {
        // 从已有之间找
        let index = rs.findIndex(item => item.get('routeName') == routeName)
        if (index >= 0) {
            rs = rs.slice(0, index + 1);
            state = state.set('aimId', rs.last().get('id'))
            payload._length = index + 1;
            return state
        }
    }

    route = route.merge({
        routeName,
        id: id || genId(routeName),
        animateWay: 'anim-slideInRight',
        props: props
    })
    state = state.set('aimId', route.get('id'))
    // last
    // state = state.mergeIn(['routes', state.get('routes').size - 1], {
    //     animateWay: 'anim-slideOutLeft'
    // })

    // pushState(route.toJS())



    return state.set('routes', state.get('routes').push(route))
}


export default (state = init, { type, payload }) => {
    if (state != init && !state.toJS) {
        state = Object.assign({}, init.toJS(), state)
        state = Immutable.fromJS(state)
    }
    switch (type) {
        case "NavTo": {
            if (state.get('isNaving')) {
                return state;
            }
            return navPush(state, payload)
        }
        case "NavBack": {
            if (state.get('isNaving')) {
                return state;
            }
            const { delta = 1, force } = payload
            let rs = state.get('routes');
            if (rs.size == 1) {
                // return navPush(state, {
                //     routeName: state.get('baseRouteName')
                // })
                location.href = "/"
                return state;
            }


            let aimIndex = rs.size - delta - 1

            state = state.merge({
                status: 'NavBack',
                isNaving: true,
                aimId: force ? '' : state.setIn(['routes', aimIndex >= 0 ? aimIndex : 0, 'id'])
            })

            // state = state.setIn(['routes', aimIndex >= 0 ? aimIndex : 0, 'animateWay'], 'anim-slideInLeft')
            // state = state.setIn(['routes', rs.size - 1, 'animateWay'], 'anim-slideOutRight')
            return state
        }
        case "NavEnd": {
            state = state.set('isNaving', false)
            let rs = state.get('routes');
            if (state.get('status') == 'NavBack') {
                const { delta = 1 } = payload
                state = state.set('routes', rs.slice(0, rs.size > delta ? (rs.size - delta) : 1))
            }
            else {
                if (payload._length) {
                    rs = rs.slice(0, payload._length);
                    state = state.set('routes', rs);
                }
            }
            state = state.set('status', '')
            return state;
        }
        case "NavParams": {
            // 修改 路由参数
            let { id, props } = payload;
            let aimIndex = state.get('routes').findIndex(item => item.get('id') == id);
            if (aimIndex > -1) {
                state = state.mergeIn(['routes', aimIndex, 'props'], props)
                replaceState(state.getIn(['routes', aimIndex]).toJS())
                return state;
            }
        }
    }

    return state;
}