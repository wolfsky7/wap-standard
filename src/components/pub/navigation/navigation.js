import { connect } from 'react-redux'

import NavPage from './navPage'

import Header from './header'


@connect(state => ({
	routes: state.nav.get('routes'),
	status: state.nav.get('status'),
	aimId: state.nav.get('aimId'),
	animate: state.nav.get('animate'),
}), dispatch => ({
	navTo: (rn, ps) => dispatch({
		type: 'NavTo', payload: {
			routeName: rn,
			props: ps
		}
	}),
	navBack: delta => dispatch({
		type: 'NavBack', payload: {
			delta
		}
	}),
	setRoute: (id, ps) => dispatch({
		type: 'NavParams',
		payload: {
			id,
			props: ps
		}
	}),
}))
export default class Navigation extends React.Component {
	constructor(props) {
		super();

		this.state = {
			lastId: '',
		}

		this.store = {
			navTo: props.navTo,
			navBack: props.navBack,
		}

	}

	setRoute(id) {
		return (ps) => {
			this.props.setRoute(id, ps)
		}
	}
	render() {

		let renderHeader = this.props.renderHeader || this.renderHeader
		const lastId = this.state.lastId;
		const activeId = this.props.routes.last().get('id');


		return <div className='pages'>
			{
				this.props.routes.map(route => {
					const { component, props = {}, animateWay, id } = route.toJS();
					let Child = component;
					if (!Child) {
						throw new Error('缺失component')
					}
					return <div className="page" id={id} key={id} >
						<div className="page-body">
							{renderHeader(route)}
							<div className={"content"}>
								<Child {...props} navigation={{ ...this.store, setRoute: this.setRoute(id) }} />
							</div>
						</div>
					</div>

				})
			}
		</div>
	}

	componentDidMount() {

	}

	componentDidUpdate() {
		switch (this.props.status) {
			case "NavTo": {
				$.router.loadPage('#' + this.props.aimId, !this.props.animate)
				break;
			}
			case "NavBack": {
				this.props.amiId && $.router.backTo(this.props.amiId)
				break;
			}
		}
	}

	renderHeader(route) {
		if (route.navProps && (route.navProps.title || route.navProps.header)) {
			if (route.navProps.header) {
				return route.navProps.header();
			}
			return <Header {...route.navProps} />
		}
	}
}

Navigation.defaultProps = {
	willAnimate: true,
	renderOthers: null,
	renderHeader: null,
}
