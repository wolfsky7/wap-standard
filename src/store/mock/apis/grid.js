import { ApiTest } from '../../../common/api'

import { Random } from "mockjs"

import { arr, makArr, obj } from "../../../libs/tools/mock"


export default {
    [ApiTest.grid.list.toString()]: arr(makArr(20, () => ({
        name: Random.name(),
        phone: Random.word(8, 12),
        age: Random.integer(12, 50),
        gender: Random.boolean(),
        avator: Random.image("250", "#fb0a2a", "hello"),
        wxcode: Random.guid(),
        address: Random.hex(),
        id: Random.guid()
    }))),
}