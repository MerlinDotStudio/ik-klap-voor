import { useInView } from 'react-intersection-observer';
import { AnimatePresence, motion } from 'framer-motion';
import { css } from '@emotion/core';
import React from 'react';

const THRESHOLD = [0.25]; // Store multiple thresholds in a constant
const FadeIn = ({ children, delay }) => {
    const [ref, inView] = useInView({
        threshold: THRESHOLD,
        triggerOnce: true,
    });
    return (
        <motion.div
            ref={ref}
			initial={{
				opacity: 0,
				y: '-0.25rem'
			}}
            animate={{
            	opacity: inView ? 1 : 0,
				y: inView ? '0rem' : '-0.25rem'
            }}
            transition={{ duration: 0.25, delay: delay ? delay : undefined }}
            css={css`
                display: inherit;
                flex-flow: inherit;
                justify-content: inherit;
                align-items: inherit;
                width: 100%;
                text-align: inherit;
                margin: inherit;
            `}
        >
            {children}
        </motion.div>
    );
};
export default FadeIn;
