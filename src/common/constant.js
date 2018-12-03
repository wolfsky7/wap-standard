export const ApiProServer = ""
export const ApiDevServer = ""
export const ApiServer = process.env.NODE_ENV == "production" ? ApiProServer : ApiDevServer

export const WxAppId = "";




// 接口URL地址
export const getApiUrl = () => {
    switch (process.env.NODE_ENV) {
        case "development":
            return ApiDevServer
        case "test":
            return ApiDevServer
        case "production":
            return ApiProServer
        default:
            return ApiProServer
    }
}