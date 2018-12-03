import Carousel from 'antd/lib/carousel'

const styles = {
    p1: {
        background: 'red',
        height: 200
    },
    p2: {
        background: 'balck',
        height: 200
    },
    p3: {
        background: 'green',
        height: 200
    },
    p4: {
        background: 'purple',
        height: 200
    },
}


class HomeCarousel extends React.PureComponent {
    constructor() {
        super()
    }
    render() {
        return <div style={{ height: 200, marginBottom: 15 }}>
            <Carousel autoplay>
                <div><div style={styles.p1}><h1>1</h1></div></div>
                <div><div style={styles.p2}><h2>2</h2></div></div>
                <div><div style={styles.p3}><h3>3</h3></div></div>
                <div><div style={styles.p4}><h4>4</h4></div></div>
            </Carousel>
        </div>

    }
}


export default HomeCarousel;