import React from 'react';
import { css } from '@emotion/core';

function FacebookIcon(props) {
    const { color, width, height, styles } = props;
    const style = css`
        width: ${width ? width : '1rem'};
        height: ${height ? height : '1rem'};
    `;

    return (
        <svg
            css={[style, styles ? styles : null]}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 23 24"
        >
            <path
                fill={color ? color : '#FFF'}
                fillRule="evenodd"
                d="M19.92.98H3.5A3.03 3.03 0 00.47 4v16.42a3.03 3.03 0 003.03 3.03h8.1l.01-8.03H9.53a.5.5 0 01-.5-.5v-2.59c0-.27.21-.49.49-.49h2.08v-2.5c0-2.9 1.77-4.49 4.36-4.49h2.13c.27 0 .5.22.5.5v2.18a.5.5 0 01-.5.5h-1.3c-1.41 0-1.69.66-1.69 1.64v2.17h3.1c.3 0 .52.26.49.55l-.3 2.6a.5.5 0 01-.5.43h-2.77l-.02 8.03h4.82a3.03 3.03 0 003.03-3.03V4A3.03 3.03 0 0019.92.98"
            ></path>
        </svg>
    );
}

export default FacebookIcon;
