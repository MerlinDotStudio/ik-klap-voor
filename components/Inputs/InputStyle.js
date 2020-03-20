import React from 'react';
import { css } from '@emotion/core';
import { theme } from '../../styles/global';

const InputStyle = props => {
    const Input = css`
        background-color: ${theme.colors.white};
        color: #707070;
        border-radius: 8px;
        border: 1px solid ${theme.colors.white};
        cursor: text;
        box-shadow: inset 0 1px 3px 0 rgba(15, 31, 44, 0.1);
        resize: none;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial,
                                sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';

        width: 100%;

        font-weight: normal;
        font-size: 1.125rem !important;
        outline: none;
        display: inline-block;

        margin: 1rem auto;
        padding: 1rem;

        z-index: 1;
        transition: border 150ms ease-out, box-shadow 150ms ease-out;

        &::placeholder {
            color: #707070;
            font-size: 1.125rem;
        }

        &::first-letter {
            text-transform: capitalize;
        }

        &:hover {
            border: 1px solid ${theme.colors.burple};
        }
        &:focus {
            border: 1px solid ${theme.colors.burple};
            box-shadow: 0 0 5px 0 rgba(61, 94, 249, 0.5), inset 0 1px 3px 0 rgba(15, 31, 44, 0.1);
        }
    `;

    return Input;
};

export default InputStyle;
