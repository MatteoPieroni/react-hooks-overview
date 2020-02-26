// this component loads repos results onMount
import React, { Component, useState, useEffect } from 'react';
import Axios from 'axios';

import { ResultCard } from './ResultCard';
import { Loader } from './Loader';

export const ResultsList = ({ url }) => {
	const [repos, setRepos] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	useEffect(() => {
		const fetch = async () => {
			setLoading(true);

			try {
				const response = await Axios.get(url);

				setRepos(response.data)
			} catch (e) {
				console.log(e);

				setError('There has been an error fetching')
			}
			setLoading(false);
		}

		fetch();
	}, [url]);

	if (loading) {
		return (
			<Loader />
		)
	}

	return repos.length > 0 ? (
		<>
			<h3>Repos list</h3>
			<ul className="repo-list">
				{repos.map(repo =>
					<li key={repo.id}>
						<ResultCard repo={repo} />
					</li>
				)}
			</ul>
		</>
	) : null;
}