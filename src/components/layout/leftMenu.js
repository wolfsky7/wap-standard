import Menu from 'antd/lib/menu';
import Icon from 'antd/lib/icon';
import Button from 'antd/lib/button';
import Layout from 'antd/lib/layout';
const { Sider } = Layout;
import { connect } from 'react-redux'
import authUtil from '../../utils/authUtil';
import baseUtil from '../../utils/baseUtil';
import cookie from '../../libs/tools/cookie'
import { SsrUpdate } from '../../common/actionType'
import Link from 'next/link'



const SubMenu = Menu.SubMenu;

import Router, { withRouter } from 'next/router'

@connect(state => {
    let lm = state.ssr.toJS()['l'];

    return {
        openedKeys: lm.o,
        selectedKey: lm.s,
        collapsed: lm.c,
        title: lm.t
    }
}, dispatch => ({
    changeSSR(payload) {
        dispatch({
            type: SsrUpdate,
            payload
        })
    }
}))
export default class LeftMenu extends React.Component {
    constructor() {
        super();
        this.pages = authUtil.getAuthorizedPages()
        this.storageInfo = {}
    }
    componentDidMount() {
    }

    toggleCollapsed = () => {
        this.props.changeSSR({
            l: {
                c: !this.props.collapsed,
                o: this.props.openedKeys,
                s: this.props.selectedKey,
                t: this.props.title,
            }
        })
    }

    renderMenu() {
        let pages = this.pages;
        let openedKeys = this.props['openedKeys'];
        let selectKey = this.props['selectedKey']
        let collapsed = this.props.collapsed


        if (!pages || !pages.length) {
            return null;
        }

        return <Menu
            defaultSelectedKeys={[selectKey]}
            defaultOpenKeys={openedKeys}
            mode="inline"
            theme="dark"
            inlineCollapsed={collapsed}
            onSelect={this.onSelect}
            onOpenChange={this.onOpen}
        >
            {
                pages.map(item => {
                    if (item.items && item.items.length) {
                        return <SubMenu key={item.name} title={<span><Icon type={item.icon || "mail"} /><span>{item.name}</span></span>}>
                            {
                                item.items.map(childItem => {
                                    return <Menu.Item data-tag={childItem.name} key={childItem.route ? 'r-' + childItem.route : childItem.name}>
                                        {childItem.icon && <Icon type={childItem.icon} />}
                                        <span>{childItem.name}</span>
                                    </Menu.Item>
                                })
                            }
                        </SubMenu>
                    }
                    return <Menu.Item data-tag={item.name} key={item.route ? 'r-' + item.route : item.name} >
                        <Icon type={item.icon || "pie-chart"} />
                        <span>{item.name}</span>
                    </Menu.Item>
                })
            }
        </Menu>
    }

    render() {
        let collapsed = this.props['collapsed']

        return (
            <Sider collapsible
                collapsed={collapsed}
                onCollapse={this.toggleCollapsed} width={200}>
                <Link href="/">
                    <a className="app-link-main">
                        <Icon style={{
                            fontSize: 30,
                            color: 'red',
                        }} type="pic-right">后台管理</Icon>
                    </a>
                </Link>
                {this.renderMenu()}

            </Sider>
        );
    }

    onSelect = ({ item, key, selectedKeys }) => {
        // this.storageInfo.selectedKey = key
        // this.persist();
        this.props.changeSSR({
            l: {
                c: this.props.collapsed,
                o: this.props.openedKeys,
                s: key,
                t: item.props['data-tag']
            }
        })

        if (key.slice(0, 2) == 'r-') {
            process.nextTick(() => {
                let rn = key.slice(2)
                Router.push(rn, rn)
            })
        }
    }

    onOpen = (openKeys) => {
        // this.storageInfo.openedKeys = openKeys
        // this.persist();
        this.props.changeSSR({
            l: {
                c: this.props.collapsed,
                o: openKeys,
                s: this.props.selectedKey,
                t: this.props.title
            }
        })
    }

    persist = () => {
        // 存入cookie  ssr 也能获取
        // sessionStorage.setItem('$#$LeftMenu', JSON.stringify(this.storageInfo))
        // baseUtil.setSrrData('leftMenu', JSON.stringify(this.storageInfo))
        // cookie.setItem('$#$LeftMenu', JSON.stringify(this.storageInfo))

    }
}