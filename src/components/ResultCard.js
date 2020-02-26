import React from 'react';

export const ResultCard = ({ repo }) => {
	const { name, html_url: url, description } = repo;
	return (
		<>
			<a href={url} target="_blank" rel="noopener noreferrer"><h3>{name}</h3></a>
			{description && <p>{description}</p>}
		</>
	);
}