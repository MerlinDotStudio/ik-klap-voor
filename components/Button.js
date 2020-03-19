import React from 'react';
import styled from '@emotion/styled';
import Link from 'next/link';

const ButtonStyles = `
    -webkit-appearance: none;
    text-decoration: none;
    border: 0;
    background-color: white;
    color: #13547A;
    border-radius: 1rem;
    box-shadow: 0 -2px 10px 0 rgba(0, 0, 0, .16);
    font-size: 1.5rem;
    font-weight: bold;
    outline: none;
    cursor: pointer;
    padding: 1rem;
    width: 100%;
    transition: transform 150ms ease-out, background-color 150ms ease-out;

    &[aria-disabled='true'] {
        opacity: 0.75;
        cursor: not-allowed;

        &:hover {
            transform: none;
        }
    }

    &:hover,
    &:focus {
        transform: scale(1.05);
    }
    &:active {
        transform: scale(1);
    }

`;

const ButtonElement = styled.button`
    ${ButtonStyles}
`;

export const Button = props => {
	const { children, ariaDisabled, onClick, styles, type, to } = props;

	const LinkButton = styled.div`
        a {
            ${ButtonStyles}
        }
    `;

	return to ? (
		<LinkButton>
			<Link href={to}>{children}</Link>
		</LinkButton>
	) : (
		<ButtonElement
			css={styles}
			aria-disabled={ariaDisabled}
			onClick={onClick}
			type={type ? type : 'button'}
		>
			{children}
		</ButtonElement>
	);
};
