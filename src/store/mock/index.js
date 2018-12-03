import mockFun from '../../libs/tools/mock'
import { ApiServer } from '../../common/constant'


import User from './apis/user'
import grid from './apis/grid'

if (process.browser && process.env.NODE_ENV == "development") {
    let mockData = [User, grid].reduce((last, now) => {
        return Object.assign(last, now)
    }, {})
    mockFun(mockData)
}
