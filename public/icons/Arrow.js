import React from 'react';
import { css } from '@emotion/core';

export default props => {
    const { left, color, extraStyle } = props;

    const style = css`
        width: 0.8rem;
        height: 0.75rem;
        transform: scaleX(${left && left === true ? -1 : 1});
        transform-origin: center;
        transition: transform 150ms ease-out, fill 150ms ease-out;
    `;

    return (
        <svg
            css={[style, extraStyle]}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 9 14"
        >
            <path
                fill="none"
                fillRule="evenodd"
                stroke={color ? color : '#3D5EF9'}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M.21 11.75l6.01-5.88L.22 0"
                transform="translate(-636 -407) translate(328 220) translate(28 169) translate(23.03 16) matrix(-1 0 0 1 264.58 3) rotate(180 3.22 5.88)"
            />
        </svg>
    );
};
