// import Layout from 'antd/lib/layout';
// import Icon from 'antd/lib/icon';
// import Row from 'antd/lib/row';
// import Col from 'antd/lib/col';
import '../common/source'
import LeftMenu from '../components/layout/leftMenu'
const { Header, Footer, Sider, Content } = Layout;
import Link from 'next/link'
import authUtil from '../utils/authUtil'
import HeaderUser from '../components/layout/headerUser'
import Loading from '../components/pub/loading'


const defaultLayoutAble = (BaseComponent) => {
    let rawRender = BaseComponent.prototype.render

    let didMount = BaseComponent.prototype.componentDidMount

    BaseComponent.prototype.componentDidMount = function () {
        // 登录 或者 权限 检测
        if (!authUtil.isAuthorized(location.pathname)) {
            window.location = "/"
        }
        didMount && didMount.call(this)
    }

    BaseComponent.prototype.render = function () {
        return <div></div>
        return <Layout style={{ flexDirection: 'row' }}>
            <LeftMenu />
            <Layout className="app-body">
                <Header className="app-header">
                    <HeaderUser />
                </Header>
                <Content className="app-content">
                    {rawRender.call(this)}
                </Content>
                <Footer>Footer</Footer>
            </Layout>
            <Loading />
        </Layout >
    }
}

export default defaultLayoutAble