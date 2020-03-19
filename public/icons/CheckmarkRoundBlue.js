import React from "react";
import { css } from '@emotion/core';

export default props => {
	const { color, extraStyle } = props;

	const style = css`
		width: 0.75rem;
		height: 0.5625rem;
	`;

	return (
		<svg css={[style, extraStyle]} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 11">
			<path
				fill="none"
				fillRule="evenodd"
				stroke="#3D5EF9"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="4"
				d="M21 13l-6.88 6.88L11 16.75"
				transform="translate(-396 -100) translate(387 89)"
			></path>
		</svg>
	);
};
