import React from 'react';
import { css } from '@emotion/core';

interface Props {
    color?: string;
    width?: string;
    height?: string;
}

const SearchIcon: React.FC<Props> = props => {
    const { color, width, height } = props;
    const style = css`
        width: ${width ? width : '1rem'};
        height: ${height ? height : '1rem'};
        path {
            fill: currentColor;
        }
    `;

    return (
        <svg css={style} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
            <path
                fill={color ? color : '#6A6D6F'}
                d="M15.64 15.66a1.23 1.23 0 000-1.74l-3.11-3.12a.3.3 0 01-.04-.38 6.78 6.78 0 10-2.09 2.08.3.3 0 01.38.04l3.11 3.12a1.23 1.23 0 001.75 0zM6.8 2.48a4.3 4.3 0 11-.01 8.6 4.3 4.3 0 01.01-8.6z"
            ></path>
        </svg>
    );
};

export default SearchIcon;
