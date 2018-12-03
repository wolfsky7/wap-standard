// This file doesn't go through babel or webpack transformation.
// Make sure the syntax and sources this file requires are compatible with the current node version you are running
// See https://github.com/zeit/next.js/issues/1245 for discussions on Universal Webpack or universal Babel
const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')
const path = require('path')
const fs = require('fs')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

console.log('env>' + process.env.NODE_ENV)

app.prepare().then(() => {
    createServer((req, res) => {
        // Be sure to pass `true` as the second argument to `url.parse`.
        // This tells it to parse the query portion of the URL.
        const parsedUrl = parse(req.url, true)
        const { pathname, query } = parsedUrl

        // 微信授权需要用到
        if (staticCheck(pathname, req, res)) {
            return;
        }

        // wap 只有一个入口 app
        return app.render(req, res, '/app', query, parsedUrl)

        // if (pathname === '/a') {
        //     app.render(req, res, '/b', query)
        // } else if (pathname === '/b') {
        //     app.render(req, res, '/a', query)
        // } else {
        //     handle(req, res, parsedUrl)
        // }
    }).listen(3000, err => {
        if (err) throw err
        console.log('> Ready on http://localhost:3000')
    })
})


const staticCheck = (pathname, req, res) => {
    if (/\.(txt)/.test(pathname) || /rem\.js/.test(pathname)) {
        var staticPath = path.resolve(__dirname, "static")
        //获取资源文件绝对路径
        var filePath = path.join(staticPath, pathname)
        if (filePath.indexOf("favicon.ico") === -1) {//屏蔽浏览器默认对favicon.ico的请求
            //同步读取file
            var fileContent = fs.readFileSync(filePath, "binary")
            res.write(fileContent, "binary")
        }
        res.end()
        return true;
    }
    return false;
}