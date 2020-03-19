import React from 'react';
import { motion } from 'framer-motion';
import styled from '@emotion/styled';

const HamburgerIcon = props => {
    const { closed } = props;
    const Svg = styled(motion.svg)`
        width: 1.375rem;
        height: 1.375rem;
    `;

    return (
        <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 10">
            <g fill="#383C3F" fillRule="evenodd">
                <motion.rect
					initial={{
						fill: '#FFF',
					}}
					animate={{
						fill: closed ? '#383C3F' : '#FFF',
						rotate: !closed ? '0' : '45deg',
						y: !closed ? '0' : '3px',
						scale: !closed ? 1 : 0.8,
					}}
					width="22" height="2.73" rx="1.36"></motion.rect>
                <motion.rect
					initial={{
						fill: '#FFF',
					}}
					animate={{
						fill: closed ? '#383C3F' : '#FFF',
						rotate: !closed ? '0' : '-45deg',
						y: !closed ? '7px' : '3px',
						scale: !closed ? 1 : 0.8,
					}}
					width="22" height="2.73" transform="0 7" rx="1.36"></motion.rect>
            </g>
        </Svg>
    );
}

export default HamburgerIcon;
