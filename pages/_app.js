import React from 'react'
import App, { Container } from 'next/app'
import Head from 'next/head'
import { Provider } from 'react-redux'
import makeStore from '../src/store/index'
import { getPreloadState } from '../src/store/middleware/cookie'

import pages from '../src/common/pages'
import { popInit } from '../src/store/reducers/nav'

export default class MyApp extends App {
    static async getInitialProps({ Component, router, ctx }) {
        let pageProps = {}
        let /*一些 client 或者 服务器 都需要的数据 来源于cookie  */ssr = ''

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx)
        }

        if (ctx && ctx.req && ctx.req.headers.cookie) {
            ssr = getPreloadState(ctx.req.headers.cookie)
        }

        // 首页路由
        // 因为强制转到app 需要 手动一次
        let navRoute = { routeName: '/' }
        if (ctx.req) {
            let pathname = /\/.*?($|\?)/.exec(ctx.req.url)[0].replace('?', '')
            navRoute = {
                routeName: pathname,
                props: ctx.query
            }
        }

        return { pageProps, ssr: ssr, nav: navRoute }
    }

    constructor(props) {
        super(props)
        let ssr = props.ssr
        if (!ssr && process.browser) {
            ssr = getPreloadState();
        }

        let preState = ssr;

        // 路由
        let _pages = Object.keys(pages).reduce((last, key) => {
            if (pages[key].component) {
                last[key] = pages[key]
            }
            else {
                last[key] = {
                    component: pages[key]
                }
            }
            return last;
        }, {})
        preState = Object.assign({}, ssr, {
            nav: {
                routes: [{ id: 'root', ...props.nav, ..._pages[props.nav.routeName] }],
                pages: _pages
            }
        })



        this.store = makeStore(preState)

        if (process.browser) {
            props.router.beforePopState(() => {
                return false;
            })
            popInit(this.store.dispatch)
        }
    }

    render() {
        const { Component, pageProps } = this.props
        return (
            <Container>
                <Head>
                    <title>{pageProps.title || 'App'}</title>
                </Head>
                <Provider store={this.store}>
                    <Component {...pageProps} />
                </Provider>
            </Container>
        )
    }
}