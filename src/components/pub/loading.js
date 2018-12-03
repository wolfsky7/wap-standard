import { connect } from 'react-redux'
// import Modal from 'antd/lib/modal'
// import Icon from 'antd/lib/icon'
import ReactDom from 'react-dom'

@connect(state => ({ loading: state.loading.loading }))
class LoadingModal extends React.Component {
    constructor() {
        super()
    }
    render() {
        return <div></div>
        let content = <Modal
            centered
            closable={false}
            visible={this.props.loading}
            footer={null}
            width={100}
        >
            <Icon type="loading" style={{ fontSize: '40px' }} />
        </Modal>
        if (!process.browser || !document || !document.querySelector("#modal"))
            return content

        return ReactDom.createPortal(content, document.querySelector("#modal"))
    }
}

export default LoadingModal;