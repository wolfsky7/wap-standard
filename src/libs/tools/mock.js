import _each from "lodash/forEach";
import _map from "lodash/map";
const mock = process.browser && process.env.NODE_ENV == "development" ? require("mockjs") : null;




const mockFun = (mockDatas) => {
    // 配置 模板数据
    const rawFetch = fetch;

    const newfetch = (url, opts = {}) => {
        let m = opts.method && opts.method.toLowerCase() || "";
        m = m == "get" ? "" : m;

        const key = url.replace(/\?.*/g, "") + (m ? ("-" + m) : "");

        const rs = key in mockDatas ? mockDatas[key] : null;
        if (rs) {
            return Promise.resolve({
                text: () => new Promise(s => {
                    setTimeout(() => {
                        s(rs)
                    }, 1500)
                })
            })
        }

        return rawFetch(url, opts);
    }

    if (typeof global != 'undefined') {
        // rn 微信小程序
        global.fetch = newfetch
    }
    if (typeof window != 'undefined') {
        // 浏览器
        window.fetch = newfetch
    }
}

export default mockFun;

export const obj = (res) => {
    return {
        status: 200,
        result: res
    }
}


export const arr = (rows, total = 100) => {
    return {
        status: 200,
        result: {
            rows: rows,
            total
        }
    }
}

export const makArr = (num, template) => {
    return _map(new Array(num), () => {
        return template();
    })

}