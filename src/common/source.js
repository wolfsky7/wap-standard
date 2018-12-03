/**各种公共 资源 */
import '../../static/style/index.scss';

import Router from 'next/router'
import Nprogress from 'nprogress'

import { fire } from '../libs/tools/notify'

if (process.browser) {
    // require('./rem.js')
    require('./light7.js')
    require('./wx.js')
}

Nprogress.configure({ minimum: 0.1 });
// 顶部 进度条
Router.events.on('routeChangeStart', () => {
    Nprogress.start()
})
Router.events.on('routeChangeComplete', () => {
    Nprogress.done()
    fire('routeChangeComplete')
})


