import baseUtil from "./baseUtil";

export default {


    isAuthorized(path) {

        // // 登录页面是开放访问的，任何时候都可以直接访问
        if (path === "/") {
            return true;
        }

        if (!this.checkLogin()) {
            return false;
        }

        // 理论上下面注释掉的这两行才是真正判定是否有权限访问，现在先直接返回true
        // var authorizedUris = baseUtil.getMetadata().authorizedUris || [];
        // return authorizedUris.indexOf(path) != -1;

        return true;
    },

    _authorizedPages: null,

    _authorizedTabs: null,

    getAuthorizedPages() {
        this._authorizedPages = [{
            name: '测试GridForm',
            icon: 'el-icon-location',
            opened: true,
            items: [{
                name: '测试grid',
                route: '/admin/grid',
                actived: true,
                icon: 'el-icon-service',
            }, {
                name: '测试form',
                route: '/admin/form',
                icon: 'el-icon-service',
            }, {
                name: '测试grid and from',
                route: '/admin/gf',
                icon: 'el-icon-service'
            }]
        }, {
            name: 'd3',
            icon: 'el-icon-service',
            items: [{
                name: 'force力导向图',
                route: '/d3?type=force',
                icon: 'el-icon-service'
            }, {
                name: '柱状图',
                route: '/d3?type=bar',
                icon: 'el-icon-service'
            }, {
                name: '折线图',
                route: '/d3?type=line',
                icon: 'el-icon-service'
            }, {
                name: '测试d2',
                route: '',
                icon: 'el-icon-service'
            }]
        }, {
            name: '测试其他',
            route: '/cert/exist',
            icon: 'el-icon-service',
        }];

        return this._authorizedPages;
    },

    checkAuth() {
        let path = location.pathname;

        function isIn(route) {
            if (route.route == path) {
                return true;
            }

            if (route.items) {
                return route.items.reduce((last, now) => {
                    if (last) return last;
                    return isIn(now);
                }, false)
            }

            return false;
        }

        return this._authorizedPages.reduce((last, now) => {
            if (last) return last;
            return isIn(now)
        }, false)

        // return true;
    },

    checkLogin() {
        if (!process.browser) {
            return true;
        }
        // return true;
        let token = baseUtil.getAccessToken();
        return typeof (token) === 'string' && token.length > 0;
    }

}
