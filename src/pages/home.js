


export default ({ navigation, title = "hello" }) => {
    let data = [{
        title: 'toDrawer',
        path: '/drawer',
    }, {
        title: 'toTab',
        path: '/tab'
    }, {
        title: 'toList',
        path: '/list'
    }, {
        title: 'toForm',
        path: '/form'
    }, {
        title: 'test',
        path: '/app/i2'
    }]

    const renderRow = (item) => {
        return <div>
            <h2>{item.title}</h2>
        </div>
    }

    const toItem = path => {
        return () => {
            navigation.navTo(path)
        }
    }

    return <div>
        <h1>{title}</h1>
        <ul
        >
            {
                data.map(item => {
                    return <li onClick={toItem(item.path)} key={item.path}>
                        <h2 >{item.title}</h2>
                    </li>
                })
            }
        </ul>
    </div>
}