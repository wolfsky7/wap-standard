// 这里放所有页面 的路由
import dynamic from 'next/dynamic'

import I1 from '../pages/index'
import Home from '../pages/home'
import Form from '../pages/form'
import list from '../pages/list'
import drawer from '../pages/drawer'

import t1 from '../pages/tabbar/t1'
import t2 from '../pages/tabbar/t2'
import t3 from '../pages/tabbar/t3'
import t4 from '../pages/tabbar/t4'
import t5 from '../pages/tabbar/t5'

const I2 = dynamic(() => import('../pages/index2'))

const pages = {
    '/app/i1': I1,
    '/': t1,
    '/form': Form,
    '/list': list,
    '/drawer': drawer,
    '/app/i2': I2,
    '/app/t1': t1,
    '/app/t2': t2,
    '/app/t3': t3,
    '/app/t4': t4,
    '/app/t5': t5,
}

export default pages;