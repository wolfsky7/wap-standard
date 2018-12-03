/**动画页 */
import ReactTimer from 'react-timer-mixin'
import mixable from '../../../libs/tools/mixable'

const styles = {
    div: {
        width: '100%',
        height: '100%',
    }
}

@mixable(ReactTimer)
export default class NavPage extends React.PureComponent {
    constructor(props) {
        super()
        this.state = { willDelay: false, display: 'block', isHide: false, animateWay: props.animateWay }
    }

    static defaultProps = {
        duration: 250,
        willAnimate: false,
        animateWay: 'slideInLeft'
    }
    static getDerivedStateFromProps(nextProps, preState) {
        if (nextProps.willAnimate) {
            return {
                willDelay: preState.isHide,
                display: 'block',
                isHide: false,
            }
        }
        if (!nextProps.willAnimate) {
            return {
                willDelay: false,
                isHide: true,
                display: 'none'
            }
        }
        return null;
    }


    willAnimate = () => {
        this.setTimeout(() => {
            this.setState({
                isHide: false,
                willDelay: false
            })
        }, 20)
    }

    render() {
        const { animateWay, duration, children } = this.props
        let animated = this.props.willAnimate ? "animated" : ""

        if (this.state.willDelay) {
            // this.willAnimate();
            // animated = '';
        }

        return <div style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            // top: 0,
            // left: 0,
            display: this.state.display,
            // animationDuration: duration + 'ms',
        }} className={animateWay + ' ' + animated} >
            {children}
        </div >
    }
}