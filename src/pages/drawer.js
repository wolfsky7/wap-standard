
export default class App1 extends React.Component {
    state = {
        open: true,
    }
    onOpenChange = (...args) => {
        console.log(args);
        this.setState({ open: !this.state.open });
    }
    render() {

        return (<div className="test-drawer">
        </div>);
    }
}
