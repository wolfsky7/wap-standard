// 单表操作
import Table from '../easy-table'
import Form from '../easy-form'
import Modal from 'antd/lib/modal';
import Button from 'antd/lib/button';
import Input from 'antd/lib/input';
const Search = Input.Search

class SingleTable extends React.PureComponent {
    static defaultProps = {
        toolBtns: [],
        toolSearchFields: [],
        toolSearchable: true
    }
    constructor(props) {
        super()

        let fss = this.formatFields(props.columns)
        this.state = {
            ...fss,
            formVisible: false,
        }
    }

    formatFields(fields) {
        let ts = [], forms = [];
        fields.forEach(item => {
            const { dataIndex, title, _form = {}, hideInForm = false, hideInTable = false, ...others } = item
            if (dataIndex && !hideInForm) {
                forms.push({
                    dataIndex,
                    title,
                    ..._form
                })
            }

            if (!hideInTable)
                ts.push({
                    dataIndex,
                    title,
                    ...others
                })
        })

        return {
            tableColumns: ts,
            formFields: forms
        }
    }

    renderTool() {
        const { toolBtns = [], toolSearchFields = [], toolSearchable = true, columns, modalStyle = { width: 500 }, ...others } = this.props
        let visible = toolBtns.length || toolSearchFields.length || toolSearchable

        let fields = [];
        let btns = toolBtns.forEach(item => {
            fields.push({
                text: item.text,
                handler: item.handler,
                type: 'button',
                children: item.children,
                render: item.render
            })
        })

        fields = fields.concat(toolSearchFields)

        if (toolSearchable) {
            fields.push({
                dataIndex: 'query',
                _formItem: {
                    style: { float: 'right' },
                    label: '',
                },
                render: ({ onChange }) => {
                    return <Search
                        placeholder="关键字搜索"
                        onSearch={value => {
                            onChange(value)
                            process.nextTick(() => {
                                this.list()
                            })
                        }}
                        style={{ width: 200 }} />
                }
            })
        }

        return <Form ref="searchForm" layout="inline" fields={fields}></Form>
    }
    render() {
        const { toolBtns, toolSearchFields, toolSearchable, columns, modalStyle = { width: 500 }, getQuery, ...others } = this.props
        return <div>
            <div className="singleTable-toolbar">
                {this.renderTool()}
            </div>
            <div className="singleTable-table">
                <Table initRef={this.initTable} getQuery={this.getQuery} columns={this.state.tableColumns} {...others}></Table>
            </div>
            <Modal destroyOnClose={true} visible={this.state.formVisible} style={modalStyle} onOk={this.hideDetail}
                onCancel={this.hideDetail}>
                <h1>hello</h1>
                <Form ref={this.initFormRef} fields={this.state.formFields} />
            </Modal>

        </div>
    }

    initTable = (ref) => {
        this.table = ref;
    }

    initFormRef = ref => {
        this.form = ref
    }

    getQuery = () => {
        let obj = this.props.getQuery && this.props.getQuery() || {}
        if (this.refs.searchForm) {
            obj = Object.assign(this.refs.searchForm.getFields(), obj)
        }
        return obj
    }

    list = () => {
        this.table.list()
    }

    showDetail(values = {}) {
        let { formFields } = this.state
        formFields.forEach(item => {
            item._fieldProps = item._fieldProps || {}
            item._fieldProps.defaultValue = values[item.dataIndex] || undefined
        })

        this.setState({ formFields })
        process.nextTick(() => {
            this.setState({
                formVisible: true
            })
        })

    }

    hideDetail = () => {
        this.setState({
            formVisible: false
        })
    }

    add = () => {
        this.showDetail(undefined)

    }

    del = () => {

    }

    update = () => {

    }
}

export default SingleTable;