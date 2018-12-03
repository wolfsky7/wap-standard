import * as React from 'react'
import { connect } from 'react-redux'

import { CallApi } from '../../../store/middleware/api'
import * as PropTypes from 'prop-types';



const _cachedData = {}


class FetchableComp extends React.PureComponent {
    static defaultProps = {
        resultKey: 'data',
        api: PropTypes.string.isRequired,
        contentRender: PropTypes.func.isRequired,
    }

    constructor(props) {
        super(props);

        this.state = {
            check: (api) => {
                if (this.props && api != this.props.api) {
                    this.fetch(api)
                }
            },
            data: _cachedData[props.api] || null,
        }
    }

    static getDerivedStateFromProps(nextProps, preState) {
        preState.check(nextProps.api)
        return null;
    }

    fetch(api) {
        if (!api) {
            return
        }
        if (_cachedData[api]) {
            this.setState({
                data: _cachedData[api]
            })
            return;
        }
        this.props.fetch(api, rs => {
            this.setState({
                data: rs.data
            })
            _cachedData[api] = rs.data;
        })
    }

    componentDidMount() {
        this.fetch(this.props.api)
    }

    render() {
        return this.props.contentRender(this.state.data)
    }
}

export const FetchableComponent = connect(state => ({}), dispatch => ({
    fetch: (api, success) => {
        dispatch({
            type: CallApi,
            payload: {
                api: api,
                success: success
            }
        })
    }
}))(FetchableComp)


export default (api, render) => {
    return <FetchableComponent api={api} contentRender={render} />
}