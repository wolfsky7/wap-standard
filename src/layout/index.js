// import Layout from 'antd/lib/layout';
// import Icon from 'antd/lib/icon';
import '../common/source'
import Loading from '../components/pub/loading'
const { Header, Footer, Content } = Layout;
import Link from 'next/link'

const indextLayoutAble = (BaseComponent) => {
    let rawRender = BaseComponent.prototype.render

    BaseComponent.prototype.render = function () {
        return <div>{rawRender.call(this)}</div>
        return <Layout>
            <Header>
                <Link href="/">
                    <a>
                        <Icon style={{
                            fontSize: 30,
                            color: 'red',
                        }} type="pic-right">后台管理</Icon>
                    </a>
                </Link>
            </Header>
            <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
                {rawRender.call(this)}
            </Content>
            <Loading />
        </Layout>
    }
}

export default indextLayoutAble