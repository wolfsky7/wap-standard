


export default class ErrorPage extends React.PureComponent {
    static getInitialProps({ err, res }) {
        const statusCode = res ? res.statusCode : err ? err.statusCode : null;
        return {
            message: err && (err.message + "\r\n" + err.stackTrace) || '',
            statusCode,
        }
    }
    constructor() {
        super()
    }
    render() {
        return <div>
            <p style={{ color: 'red' }}>
                {this.props.statusCode
                    ? `An error ${this.props.statusCode} occurred on server`
                    : 'An error occurred on client'}

            </p>
            <p>
                {this.props.message}
            </p>
        </div>
    }
}