import React from 'react';
import { css } from '@emotion/core';

export default props => {
	const { color, extraStyle } = props;

	const style = css`
		color: #1DB441;
		width: 0.75rem;
		height: 0.5625rem;
		margin-right: 0.5rem;
	`;

	return (
		<svg css={[style, extraStyle]} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 9">
			<path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 1L4.12 7.88 1 4.75"></path>
		</svg>
	);
};
