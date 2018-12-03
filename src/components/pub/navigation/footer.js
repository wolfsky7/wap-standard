import { data as tabs } from '../../../common/tab'
import { connect } from 'react-redux'


@connect(state => {
    return { currentRoute: state.nav.get('routes').last().get('routeName') }
}, dispatch => ({
    navTo: href => {
        dispatch({
            type: 'NavTo',
            payload: {
                routeName: href,
                animate: false,
                createNew:false,
            }
        })
    }
}))
export default class Footer extends React.Component {

    constructor(props) {
        super();

        this.ts = 0;

        this.state = {
            index: props.index,
            isNone: false
        }
    }


    render() {
        if (this.props.isVisible) {
            this.state.isNone = false;
        }
        const style = { position: "fixed", bottom: 0, animationDuration: ".35s" }
        if (this.state.isNone) {
            style.display = "none"
        }

        let isVisible = tabs.reduce((last, item) => {
            return last || item.href == this.props.currentRoute;
        }, false)

        this.isVisible = isVisible

        return <div className={"bar bar-tab footer animated " + (isVisible ? "slideInUp" : "slideOutDown")}
            style={style}>
            {
                tabs.map((tab, tindex) => {
                    return <a onClick={this.onClick(tindex, tab.href, tab)} key={"tab" + tindex}
                        className={"external tab-item" + (tab.href == this.props.currentRoute ? " active" : "")}>
                        <i className={"icon " + tab.cls}></i>
                        <span className="tab-label">{tab.title}</span>
                        {
                            // (0, () => {
                            //     if (tindex === 3 && MessageStore.newMessageCount && MessageStore.newMessageCount.total > 0) {
                            //         /*return <span className="badge">{tab.badge}</span>*/
                            //         return <span className="badge"
                            //             style={{
                            //                 minWidth: 0,
                            //                 height: "0.5rem",
                            //                 width: "0.5rem",
                            //                 left: "55%",
                            //                 padding: 0,
                            //                 top: "0.3rem",
                            //                 border: "0.05rem solid #FFFFFF"
                            //             }}></span>
                            //     }
                            //     return null;
                            // })()
                        }
                    </a>
                })
            }
        </div>
    }

    componentDidUpdate() {
        if (!this.state.isNone && !this.isVisible) {
            clearTimeout(this.ts)
            this.ts = setTimeout(() => {
                this.setState({
                    isNone: true
                })
                this.ts = null;
            }, 250)
        }
        if (this.isVisible && this.ts) {
            clearTimeout(this.ts);
        }
    }

    componentWillUnmount() {
        clearTimeout(this.ts);
    }

    onClick(index, href, tab) {
        return (e) => {
            // 别点太快
            if (this.ts && Date.now() - this.ts < 500) {
                return;
            }
            if (this.props.currentRoute == href) {
                return
            }

            this.ts = Date.now();

            e.stopPropagation();
            e.preventDefault();
            e.nativeEvent.stopImmediatePropagation();

            this.props.navTo(href)
        }
    }
}