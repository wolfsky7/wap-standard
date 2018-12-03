const renderItem = () => {
    return <div style={styles.masterItem}>
        <div style={styles.masterHead}>
            <div style={styles.masterHeadAvatar}></div>
            <div style={styles.masterHeadTitle}>
                <span style={styles.masterHeadTitleName}>大师</span>
                <div>
                    <span style={styles.masterHeadTitleStar}></span>
                    <span style={styles.masterHeadTitleStar}></span>
                    <span style={styles.masterHeadTitleStar}></span>
                    <span style={styles.masterHeadTitleStar}></span>
                    <span style={styles.masterHeadTitleStar}></span>
                </div>

            </div>
        </div>
        <div style={styles.masterBody}>
            问：“太极拳”讲究形劲意气，四两拨千斤，强身健体，延年益寿；“健身”是锻炼身体各个部位肌肉，控制体脂含量，打造匀称身材。 那太极和健身，哪个效果更好了？
            </div>
        <div style={styles.masterFooter}>
            <div style={styles.masterFooterBefore}>偷看：20次</div>
            <div style={styles.masterFooterBefore}>偷看：20次</div>
            <div style={styles.masterFooterAfter}>偷看：20次</div>
        </div>
    </div>
}

export default () => {
    return <div>
        <div style={styles.whiteSpace} />
        {renderItem()}
        <div style={styles.whiteSpace} />
        {renderItem()}
        <div style={styles.whiteSpace} />
        {renderItem()}
        <div style={styles.whiteSpace} />
        {renderItem()}
        <div style={styles.whiteSpace} />
        {renderItem()}
    </div>
}

const styles = {
    whiteSpace: {
        height: '0.5333rem',
        backgroundColor: '#F8F8F8'
    },
    masterItem: {
        paddingLeft: '0.9600rem',
        paddingRight: '0.9600rem',
        paddingTop: '0.6933rem',
        paddingBottom: '0.6933rem',
        background: '#fff'
    },
    masterHead: {
        display: 'flex',
        justifyContent: 'flex-start',
        flexDirection: 'row'
    },
    masterHeadAvatar: {
        width: '2.6667rem',
        height: '2.6667rem',
        borderRadius: '50%',
        background: 'red'
    },
    masterHeadTitle: {
        marginLeft: '0.5333rem',
        height: '2.6667rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
    },
    masterHeadTitleName: {
        fontSize: '0.8533rem',
        marginBottom: '0.3733rem',
        color: '#2B2B2E'
    },
    masterHeadTitleStar: {
        display: 'inline-block',
        width: '0.8000rem',
        height: '0.8000rem',
        borderRadius: '50%',
        background: 'red',
        marginRight: '0.2133rem'
    },
    masterBody: {
        paddingTop: '0.9067rem',
        paddingLeft: '0.4267rem',
        fontSize: '0.7467rem',
        color: '#2B2B2E'
    },
    masterFooter: {
        paddingTop: '0.8000rem',
        paddingLeft: '0.4267rem',
        display: 'flex',
        justifyContent: 'flex-start'
    },
    masterFooterBefore: {
        fontSize: '0.8000rem',
        color: '#9B9B9B',
        marginRight: '1.1200rem'
    },
    masterFooterAfter: {
        fontSize: '0.8000rem',
        color: '#2B2B2E',
        flex: 1,
        textAlign: 'right'

    }


}