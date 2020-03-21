import React from 'react';
import styled from '@emotion/styled';
import Link from 'next/link';
import { motion } from 'framer-motion';

const ButtonStyles = `
    -webkit-appearance: none;
    text-decoration: none;
    border: 0;
    background-color: white;
    color: #13547A;
    border-radius: 10rem;
    box-shadow: 0 -2px 10px 0 rgba(0, 0, 0, .16);
    font-size: 1.25rem;
    font-weight: bold;
    outline: none;
    cursor: pointer;
    padding: 1rem 2.5rem 1rem 2.5rem;
    position: relative;
    white-space: nowrap;
    width: 100%;
    display: inline-block;
    text-align: center;
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

    i {
    	position: absolute;
    	left: 1.25rem;
    	top: 50%;
    	transform: translateY(-50%);
    	text-transform: none;
    	font-style: normal;
    }
`;

const ButtonElement = styled(motion.button)`
    ${ButtonStyles}
`;

export const Button = props => {
	const { children, ariaDisabled, onClick, styles, type, to, icon } = props;

	const LinkButton = styled(motion.div)`
        a {
            ${ButtonStyles}
            ${styles ? styles : null}
        }
    `;

	return to ? (
		<LinkButton>
			<Link href={to}>
				<a>
					{icon ? <i>{icon}</i> : null}
					{children}
				</a>
			</Link>
		</LinkButton>
	) : (
		<ButtonElement
			css={styles}
			aria-disabled={ariaDisabled}
			onClick={onClick}
			type={type ? type : 'button'}
		>
			{icon ? <i>{icon}</i> : null}
			{children}
		</ButtonElement>
	);
};
