
const mUrl = (method, path) => {
    return {
        method, path, toString: () => path
    }
}

// user  
export const ApiUserRefresh = mUrl('get', "/user/profile")

export const ApiTest = {
    grid: {
        list: mUrl('get', '/test/grid/list')
    }
}


export const API_LOGIN = "/user/login"
export const API_WX_JS = "/user/jssign"