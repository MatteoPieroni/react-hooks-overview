import React, { Component } from 'react';
import Axios from 'axios';

import { UserCard } from './UserCard';
import { ResultsList } from './ResultsList';
import { Loader } from './Loader';

export class User extends Component {
	state = {
		search: '',
		error: '',
		loading: false,
		userData: {},
	};

	handleChange = (event) => {
		const { target: { value } } = event;

		this.setState({ search: value });
	}

	handleSearch = async (event) => {
		event.preventDefault();
		this.setState({
			loading: true,
		})

		try {
			const response = await Axios.get(`https://api.github.com/users/${this.state.search}`);

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

			this.setState({
				userData: {
					name,
					id,
					avatarUrl,
					reposUrl,
					blog,
					location,
					publicRepos,
					createdAt,
				}
			});
		} catch (e) {
			console.log(e);
			this.setState({
				error: 'We cannot seem to find this user',
			})
		}

		this.setState({
			loading: false,
		});
	}

	render() {
		return (
			<div className="container">
				<form className="form-search" onSubmit={this.handleSearch}>
					{this.state.error && <p>{this.state.error}</p>}
					<label htmlFor="search">What username do you want to view?</label>
					<input id="search" name="search" type="text" value={this.state.search} onChange={this.handleChange} />
					<input type="submit" value="Submit"/>
				</form>
				{this.state.loading && <Loader />}
				{this.state.userData.id && <UserCard user={this.state.userData} />}
				{this.state.userData.reposUrl && <ResultsList url={this.state.userData.reposUrl} />}
			</div>
		);
	}
}