import EasyForm from '../../components/pub/easy-form'
import { regs } from '../../libs/tools/validator'
import Checkbox from 'antd/lib/checkbox'
import Button from 'antd/lib/button'

import baseUtil from '../../utils/baseUtil'

// 

class Login extends React.PureComponent {
    constructor() {
        super()

        this.fields = [
            {
                dataIndex: 'userName',
                title: '用户名',
                rules: {
                    type: 'string',
                    required: true,
                    pattern: regs.unm,
                    message: '用户名不正确'
                }
            }, {
                dataIndex: 'passwrod',
                title: '密码',
                rules: {
                    required: true,
                    pattern: regs.passwd,
                    message: '密码长度6-18'
                }
            }, {
                dataIndex: 'rember',
                title: ' ',
                _formItem: {
                    colon: false,
                },
                render: ({ onChange }) => {
                    return [
                        <Checkbox onChange={onChange} key="1">Remember me</Checkbox>,
                        <a key="2" className="login-form-forgot" href="/account/resetpass" > Forgot password</a>,
                        <Button key="3" type="primary" onClick={this.submit} className="login-form-button"> Log in</Button>,
                        <span key="4">Or</span>,
                        <a key="5" href="/account/register" > register now!</a>
                    ]
                }
            }
        ]
    }
    render() {
        return <div className="login-form">
            <h1>个人登录</h1>
            <EasyForm
                ref="form"
                fields={this.fields}
            >
            </EasyForm>
        </div>
    }

    submit = () => {
        let values = this.refs.form.getFields();
        // console.log(values)

        baseUtil.login({ token: 'hello' })
    }
}

export default Login;