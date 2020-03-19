import React from 'react';
import { css } from '@emotion/core';
import { theme } from '../../styles/global';

export default (props) => {

	const styles = css`
		width: 1.2rem;
		height: 1.2rem;
		fill: ${theme.colors.burpleUi};
	`
	return (
		<svg css={styles} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
			<path d="M41 18a4 4 0 00-4-4h-6.5a.5.5 0 00-.5.5v3c0 .28.22.5.5.5H36a1 1 0 011 1v24a1 1 0 01-1 1H12a1 1 0 01-1-1V19a1 1 0 011-1h5.5a.5.5 0 00.5-.5v-3a.5.5 0 00-.5-.5H11a4 4 0 00-4 4v26a4 4 0 004 4h26a4 4 0 004-4V18zm-20 4a3 3 0 006 0V11.5c0-.28.22-.5.5-.5H31a2 2 0 001.4-3.42l-7-7a2 2 0 00-2.83 0l-7 7A2 2 0 0017 11h3.5c.28 0 .5.22.5.5V22z"></path>
		</svg>

);
};
