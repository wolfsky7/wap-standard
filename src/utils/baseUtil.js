import cookie from '../libs/tools/cookie'
export default {

    _METADATA_NAME: '_ssr_',
    _BASIC_INFO: 'app_basicInfo',
    _ACCESS_TOKEN: 'access-token',

    _getCache(key) {
        if (!process.browser) {
            return {};
        }
        if (this['_cached_' + key]) {
            return this['_cached_' + key];
        }
        let raw = sessionStorage.getItem(key);
        if (!raw) {
            console.log(" redirected by getBasicInfo()...")
            this.logout();
        }
        return this['_cached_' + key] = JSON.parse(raw);
    },
    login(json) {
        if (process.browser) {

            cookie.set(this._ACCESS_TOKEN, json.token);



            let newBasicInfo = {
                user: json.user,
                authorizedPages: json.authorizedPages || []
            };
            sessionStorage.setItem(this._BASIC_INFO, JSON.stringify(newBasicInfo))

            window.location = "/admin"
        }
    },


    logout() {
        if (process.browser) {
            cookie.delete(this._ACCESS_TOKEN);
            sessionStorage.removeItem(this._METADATA_NAME);
            sessionStorage.removeItem(this._BASIC_INFO);
        }
        window.location = "/"
    },

    getAccessToken() {
        return cookie.get(this._ACCESS_TOKEN);
    },

    setSrrData(key, value) {
        let rs = this.getSrrdata() || {};
        rs[key] = value;
        cookie.setItem(this._METADATA_NAME, JSON.stringify(rs))
    },

    getSrrdata(serverCookie) {
        // client he server 共享的数据 存放与cookie
        let raw = cookie.getItem(this._METADATA_NAME,serverCookie)
        if (raw) {
            try {
                raw = JSON.parse(raw)
                return raw;
            }
            catch (err) {
                console.error(err)
            }
        }
        return null;
    },

    getBasicInfo() {
        return this._getCache(this._BASIC_INFO)
    },
}
