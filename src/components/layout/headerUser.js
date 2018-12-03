
import Col from 'antd/lib/col'
import Avatar from 'antd/lib/avatar'
import Dropdown from 'antd/lib/dropdown'
import Menu from 'antd/lib/menu';
import Icon from 'antd/lib/icon';

import { connect } from 'react-redux'

@connect(state => ({
    title: state.ssr.getIn(['l', 't'])
}))
export default class HeaderUser extends React.PureComponent {
    constructor() {
        super()

        this.toDos = [{
            text: '个人信息',
            handler: () => {
                window.location = '/account/info'
            }
        }, {
            text: '修改密码',
            handler: () => {
                this.showPass()
            }
        }]
    }
    showPass() {

    }
    logOut = () => {

    }
    renderMenu() {
        let menu = (<Menu>
            {
                this.toDos.map((item, index) => {
                    return <Menu.Item key={item.text}>
                        <a onClick={item.handler}>{item.text}</a>
                    </Menu.Item>
                })
            }
            <Menu.Divider />
            <Menu.Item >
                <a onClick={this.logOut}>退出登录</a>
            </Menu.Item>
        </Menu>)

        return <Dropdown overlay={menu}>
            <a><Icon style={{ fontSize: 24 }} type="setting" /></a>
        </Dropdown>
    }
    render() {
        return [
            <h2 style={{ float: 'left' }} key="title">{this.props.title}</h2>,
            <div key="user" className="app-header-user">
                <Col style={{ textAlign: 'right', paddingRight: 20, paddingTop: 6 }} span="14">
                    {this.renderMenu()}
                </Col>
                <Col span="10">
                    <Avatar></Avatar>
                    <span style={{ marginLeft: 10 }}>称呼</span>
                </Col>
            </div>]
    }
}