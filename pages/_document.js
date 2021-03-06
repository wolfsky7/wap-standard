import Document, { Head, Main, NextScript } from "next/document"
if (process.browser)
    require('../src/common/rem')


export default class MyDocument extends Document {
    render() {
        return <html data-use-rem="20" style={{ fontSize: '18.75px !important' }}>
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
                <script src="/rem.js" type="text/javascript"></script>
                <Head>
                    <link rel="shortcut icon" href="/static/favicon.ico" />
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/light7/0.4.3/css/light7.min.css" />
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/light7/0.4.3/css/light7-swiper.min.css" />
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/zepto/1.2.0/zepto.min.js" type="text/javascript"></script>
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/light7/0.4.3/js/light7.min.js" type="text/javascript"></script>
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/light7/0.4.3/js/light7-city-picker.min.js" type="text/javascript"></script>
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/light7/0.4.3/js/light7-swiper.js" type="text/javascript"></script>
                    {/* <script src="https://cdn.bootcss.com/light7/0.4.3/js/light7.js" type="text/javascript"></script>
				<script src="https://cdn.bootcss.com/light7/0.4.3/js/light7-city-picker.js" type="text/javascript"></script> */}
                    {/* <script src="https://res.wx.qq.com/open/js/jweixin-1.2.0.js" type="text/javascript"></script> */}
                    <script src="https://res.wx.qq.com/open/js/jweixin-1.4.0.js" type="text/javascript"></script>
                </Head>
            </head>

            <body>
                <Main />
                <NextScript />
                <div id="modal"></div>
            </body>
        </html>
    }
}