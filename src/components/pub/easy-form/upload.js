// 
import Upload from 'antd/lib/upload'
import Icon from 'antd/lib/icon'
import Modal from 'antd/lib/modal'

class EasyUpload extends React.PureComponent {
    constructor(props) {
        super()
        this.state = {
            fileList: [],
            previewImage: null,
            previewVisible: false,
        }
    }
    render() {
        let { children, staticPre, ...others } = this.props;
        if (!children) {
            children = <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">上传</div>
            </div>
        }
        if (!others.listType) {
            others.listType = "picture-card"
            others.fileList = this.state.fileList
        }

        let { previewImage, previewVisible } = this.props

        return <Upload {...others}>
            {children}
            <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
        </Upload>
    }

    handleCancel = () => {
        this.setState({
            previewVisible: false,
        })
    }

    handerChange = ({ fileList }) => {
        if (this.props.staticPre) {
            fileList = fileList.map(item => {
                return {
                    ...item,
                    url: this.props.staticPre + item.url
                }
            })
        }
        this.setState({ fileList })
    }
}

export default EasyUpload;