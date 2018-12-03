import { isWx, auth, setUp } from "../utils/wx"
import { isWxMin, minAuth } from "../utils/wxmini"
import { loginSucc, loginOut } from "../services/login";
import { getUrlParam } from "../utils/func"
(0, () => {
    // 微信 初始化
    if (process.browser) {
        const token = minAuth()
        if (token) {
            // 先清除
            localStorage.removeItem("token");
            return loginSucc({
                result: {
                    token: token,
                    user: {}
                }
            })
        }
        if (isWx()) {
            const willClear = getUrlParam("clear");
            if (willClear) {
                loginOut()
            }

            // console.log("auth")
            auth((err, rs) => {
                console.log("authed>")
                rs && loginSucc(rs)
            });


            setUp();
        }
    }
})()