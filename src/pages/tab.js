

function renderTabBar(props) {
    return <div ><Tabs.DefaultTabBar {...props} /></div>
}
const tabs = [
    { title: 'First Tab' },
    { title: 'Second Tab' },
    { title: 'Third Tab' },
];

export default () => (
    <div>
        <ul tabs={tabs}
            initalPage={'t2'}
            renderTabBar={renderTabBar}
        >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '250px', backgroundColor: '#fff' }}>
                Content of first tab
        </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '250px', backgroundColor: '#fff' }}>
                Content of second tab
        </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '250px', backgroundColor: '#fff' }}>
                Content of third tab
        </div>
        </ul>
    </div>
);