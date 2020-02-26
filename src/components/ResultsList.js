// this component loads repos results onMount
import React, { Component } from 'react';
import Axios from 'axios';

import { ResultCard } from './ResultCard';
import { Loader } from './Loader';

export class ResultsList extends Component {
	state = {
		repos: [],
		loading: false,
		error: '',
	};

	async componentDidMount() {
		if (this.props.url) {
			// set loading
			this.setState({ loading: true });

			try {
				const response = await Axios.get(this.props.url);

				this.setState({
					repos: response.data,
				})
			} catch (e) {
				console.log(e);

				this.setState({
					error: 'There has been an error fetching'
				})
			}

			this.setState({ loading: false });
		}
	}

	render() {
		
		if (this.state.loading) {
			return (
				<Loader />
			)
		}

		return this.state.repos.length > 0 ? (
			<>
				<h3>Repos list</h3>
				<ul className="repo-list">
					{this.state.repos.map(repo =>
						<li key={repo.id}>
							<ResultCard repo={repo} />
						</li>
					)}
				</ul>
			</>
		) : null;
	}
}