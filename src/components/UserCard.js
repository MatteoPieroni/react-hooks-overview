import React from 'react';

export const UserCard = ({ user }) => {
	const {
		name,
		avatarUrl,
		blog,
		location,
		publicRepos,
		createdAt,
	} = user || {};

	return (
		<div>
			<img src={avatarUrl} alt="User profile" />
			<h2>{name}</h2>
			<div>
				<p>Public Repos: <strong>{publicRepos}</strong></p>
				<p>Blog: <strong>{blog}</strong></p>
			</div>
			<footer>
				<p>Location: <strong>{location}</strong></p>
				<p>Member since: <strong>{createdAt}</strong></p>
			</footer>
		</div>
	);
}