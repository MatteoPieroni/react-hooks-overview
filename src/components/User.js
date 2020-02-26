import React, { Component, useState } from 'react';
import Axios from 'axios';

import { UserCard } from './UserCard';
import { ResultsList } from './ResultsList';
import { Loader } from './Loader';

export const User = () => {
	const [search, setSearch] = useState('');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const [userData, setUserData] = useState({});

	const handleChange = (event) => {
		const { target: { value } } = event;

		setSearch(value);
	}

	const handleSearch = async (event) => {
		event.preventDefault();
		setLoading(true);

		try {
			const response = await Axios.get(`https://api.github.com/users/${search}`);

			const {
				name,
				id,
				avatar_url: avatarUrl,
				repos_url: reposUrl,
				blog,
				location,
				public_repos: publicRepos,
				created_at: createdAt,
			} = response.data || {};

			setUserData({
				name,
				id,
				avatarUrl,
				reposUrl,
				blog,
				location,
				publicRepos,
				createdAt,
			});
		} catch (e) {
			console.log(e);
			setError('We cannot seem to find this user');
		}

		setLoading(false);
	}

	return (
		<div className="container">
			<form className="form-search" onSubmit={handleSearch}>
				{error && <p>{error}</p>}
				<label htmlFor="search">What username do you want to view?</label>
				<input id="search" name="search" type="text" value={search} onChange={handleChange} />
				<input type="submit" value="Submit"/>
			</form>
			{loading && <Loader />}
			{userData.id && <UserCard user={userData} />}
			{userData.reposUrl && <ResultsList url={userData.reposUrl} />}
		</div>
	);
}