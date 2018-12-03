
import Storage from "../libs/tools/storage";


const sto = new Storage()

export const loginSucc = rs => {
    UserStore.copyFrom(rs.result.user);
    UserStore.token = rs.result.token
    sto.setItem("token", rs.result.token)
}

export const loginOut = () => {
    localStorage.clear();
    // sto.setItem("token","")
}

