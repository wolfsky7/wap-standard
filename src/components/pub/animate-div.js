/** div 的css 动画 如果 刚加上时 display 为none 会没有效果 */
import ReactDOM from 'react-dom'

export default class AnimateDiv extends React.Component {

    render() {
        const { style = {}, children, className = '', ...others } = this.props;
        if (this.display == 'none' && /(^| )animated( |$)/.test(className)) {

        }
        return <div style={style} className={className} {...others}>
            {children}
        </div>
    }

    componentDidUpdate() {
        let node = ReactDOM.findDOMNode(this)
        this.display = node.style.display;
        this.className = node.className;
        console.log(this.className)
    }
}