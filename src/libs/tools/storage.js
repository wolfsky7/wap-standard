// 通用db 浏览器 使用 localStorage  server 使用 内存  rn 使用asyncStorage  传进来

class MemStorage {
    cached = {}
    getItem(k) {
        return this.cached[k]
    }
    setItem(k, v) {
        return this.cached[k] = v, Promise.resolve(true);
    }

    removeItem(k) {
        delete this.cached[k];
        return Promise.resolve(true);
    }
}


export default class UniversalDB {
    constructor(storage) {
        if (storage) {
            this.storage = storage;
        }
        else {
            //browser
            if (process.browser) {
                this.storage = localStorage;
            }
            else {
                //server
                this.storage = new MemStorage();
            }
            //rn
        }
    }
    _key = "$#$"
    storage = null

    async getItem(k) {
        let v = await this.storage.getItem(k);
        if (v && v[0] == "[" && v.substr(0, this._key.length + 4) == `["${this._key}",`) {
            try {
                let nv = JSON.parse(v);
                if (nv[0] == this._key) {
                    if (+nv[2] > Date.now()) {
                        return nv[1];
                    }
                    return null;
                }
            }
            catch (err) {

            }
        }
        return v;
    }

    async setItem(k, v, timeOut = 31536000000) {
        let newV = [this._key, v, Date.now() + (timeOut)]
        return this.storage.setItem(k, JSON.stringify(newV))
    }

    removeItem(k) {
        return this.storage.removeItem(k)
    }
}