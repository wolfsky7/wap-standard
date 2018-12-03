/**wap 入口 只放一个入口 其他页面 通过路由 */
import '../src/common/source'

import Navigation from '../src/components/pub/navigation/navigation'
import Footer from '../src/components/pub/navigation/footer'

export default class App extends React.Component {
    render() {
        // style={{ position: 'absolute', width: '100%', height: '100%' }}
        return <div>
            <Footer />
            <Navigation />
        </div>
    }
}