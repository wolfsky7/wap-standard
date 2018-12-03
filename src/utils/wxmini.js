// 把小程序 相关 的 单独 放出来
import { getUrlParam, object2Query } from "../utils/func"
// 是否在小程序
export const isWxMin = () => {
    // 如果是 小程序 
    // return true;
    if (!process.browser) {
        return false;
    }
    if (/acToken/.test(location.href)) {
        // __wxjs_environment 有个注入延迟
        return true;
    }
    return window.__wxjs_environment === "miniprogram"
}

export const minAuth = () => {
    // 小程序 读不出 search
    return getUrlParam("acToken");
}

export const postMinMsg = msg => {
    wx.miniProgram.postMessage({
        data: msg
    })
}

export const wxPayResultNotify = function (succ, fail = (() => { $.toast("支付失败") })) {
    if (this.props.paystate == "succ") {
        succ && succ();
    }
    else if (this.props.paystate == "fail") {
        fail();
    }
}

export const wxMiniInt = init => {
    // 真机 上 需要延迟  否则可能会出些 莫名奇妙的问题
    setTimeout(() => {
        init && init()
    }, 1500)
}

export const wxMiniUtils = {
    getLastRoute: () => sessionStorage.getItem("currentRoute")
}

export const wxMiniPay = (result = {}) => {
    // 支付完成后 会 给个 state 的标识  succ  或者 fail
    // result.amount = 100;

    // alert(JSON.stringify(result))
    // return;
    if (!result.notify) {
        // 获取上一个 route
        // result.notify = wxMiniUtils.getLastRoute()
        result.notify = location.pathname + location.search;
        // 长度 太长 没有效果
        if (result.notify && result.notify.length > 100) {
            result.notify = "/"
        }
    }
    // result.webId = getUrlParam("webId");
    // const ps = { requestPayment: result };
    const ps = { ...result };
    // const str = ps;
    const url = "/src/pages/tabbar/pay/index?webId=" + getUrlParam("webId") + "&" + object2Query(ps, false)

    wx.miniProgram.navigateTo({ url: url })
}

// 路由拦截
export const routeWare = () => {
    const wares = ["/", "/index/home", "/index/learn", "/index/master", "/index/my", "/index/message"]
    const reflects = ["/src/pages/tabbar/index/index", "/src/pages/tabbar/index/index", "/src/pages/tabbar/study/index", "/src/pages/tabbar/master/index", "/src/pages/tabbar/my/index", "/src/pages/tabbar/msg/index"]
    const maps = {}
    wares.forEach((item, index) => {
        maps[item] = (0, index => () => {
            // wx.miniProgram.navigateTo({
            // tab 页 专有跳转
            if (!index) {
                return wx.miniProgram.navigateBack({
                    delta: 1
                })
            }
            wx.miniProgram.switchTab({
                url: reflects[index],
                fail: (err) => {
                    // alert(err)
                },
                success: () => {
                    // alert("succ")
                }
            })
        })(index)
    })
    return maps;
}