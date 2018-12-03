/** 简单的转化 */
import diff from '../libs/tools/diff'

const pre = "___"
class MboxStore {
    subscribe(obj) {
        Object.keys(this).forEach(key => {
            if (key.slice(0, pre.length) == pre || Object.prototype.hasOwnProperty.call(this, pre + key))
                return;

            let v = this[key];
            if (typeof v != "function") {
                this[pre + key] = v;
                Object.defineProperty(this, key, {
                    get: () => this[pre + key],
                    set: nv => {
                        if (diff(this[pre + key], nv)) {
                            obj.setState({ [key]: nv })
                        }
                        this[pre + key] = nv;
                    }
                })
            }
        })
    }
}