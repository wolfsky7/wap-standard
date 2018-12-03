import Table from 'antd/lib/table'
import Pagination from 'antd/lib/pagination'
import { connect } from 'react-redux'

import { CallApi } from '../../../store/middleware/api'
// 

@connect(state => ({}), dispatch => ({
    fetch: (api, params, success) => {
        dispatch({
            type: CallApi,
            payload: {
                api,
                success,
                params
            }
        })
    }
}))
export default class EasyTable extends React.Component {
    static getDefaultProps = {
        rowKey: 'id'
    }

    constructor() {
        super()
        this.state = {
            dataSource: [],
            total: 0,
            page: 0,
            pageSize: 20,
        }
    }

    componentDidMount() {
        if (this.props.api) {
            this.list()
        }

        if (this.props.initRef) {
            this.props.initRef(this)
        }
    }

    renderPagination() {
        if (this.props.pagination === false)
            return false;
        return <Pagination onChange={this.onChange} total={this.state.total} />
    }
    render() {
        let { api, dataSource, pagination = null, ...others } = this.props
        return <Table {...others} pagination={this.renderPagination()} dataSource={this.state.dataSource}></Table>
    }

    onChange = (page, pageSize) => {
        this.state.page = page;
        this.state.pageSize = pageSize;
        this.list();
    }

    getQuery() {
        let query = { page: this.state.page, pageSize: this.state.pageSize };
        if (this.props.getQuery) {
            query = Object.assign(query, this.props.getQuery())
        }
        if (this.refs['toolForm']) {
            query = Object.assign(query, this.refs['toolForm'].getFields())
        }
        return query
    }

    list = () => {
        this.props.fetch(this.props.api, this.getQuery(), rs => {
            this.setState({
                dataSource: rs.result.rows,
                total: rs.result.total
            })
        })
    }

    update = (predicate, setV) => {
        let ns = this.state.dataSource.map(item => {
            if (predicate(item)) {
                return setV(item);
            }
            return item
        });

        this.setState({
            dataSource: ns
        })
    }
    del = (predicate) => {
        let ns = this.state.dataSource.map((item, index) => {
            if (predicate(item)) {
                return false
            }
            return item
        }).filter(Boolean);

        this.setState({
            dataSource: ns
        })
    }
}