const cookie = {
    get(name, serverCookie) {
        let raw = serverCookie || (process.browser ? document.cookie : '')
        if (raw) {
            let arr
            let reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
            if (arr = raw.match(reg)) {
                return decodeURIComponent(arr[2])
            } else {
                return null
            }
        }
        return null;
    },
    getItem(name, serverCookie) {
        return this.get(name, serverCookie)
    },
    set(name, value) {
        if (!process.browser) {
            return;
        }
        value = encodeURIComponent(value)
        var cookie = name + '=' + value + '; expires=0; path=/';
        document.cookie = cookie;
    },
    setItem(name, value) {
        return this.set(name, value)
    },
    delete(name) {
        if (!process.browser) {
            return;
        }
        document.cookie = name + '=; expires=0; path=/'
    },
    removeItem(name) {
        return this.delete(name)
    }
}

export default cookie;