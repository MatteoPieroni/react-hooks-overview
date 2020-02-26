import React, { Component } from 'react';
import axios from 'axios';

import { UserCard } from './UserCard';

export class User extends Component {
	state = {
		search: '',
		error: '',
		userData: {},
	};

	handleChange = (event) => {
		const { target: { value } } = event;

		this.setState({ search: value });
	}

	handleSearch = async (event) => {
		event.preventDefault();

		try {
			const response = await axios.get(`https://api.github.com/users/${this.state.search}`);

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
	}

	render() {
		return (
			<div>
				<form onSubmit={this.handleSearch}>
					{this.state.error && <p>{this.state.error}</p>}
					<label>
						What username do you want to view?
						<input type="text" value={this.state.search} onChange={this.handleChange} />
					</label>
				</form>
				{this.state.userData.id && <UserCard user={this.state.userData} />}
			</div>
		);
	}
}