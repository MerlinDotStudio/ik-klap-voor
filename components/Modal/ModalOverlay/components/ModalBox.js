import { css } from '@emotion/core';
import { mq, theme } from '../../../../styles/global';

const ModalBoxCSS = props => css`
	background-color: rgba(55,55,55,.5);
    backdrop-filter: blur(6px);
    color: white;

    width: 100%;
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem 2rem 1rem 2rem;

    position: relative;
    z-index: 5;
    overflow: hidden;

    pointer-events: auto;
    transform-origin: center;
    opacity: 0;
    will-change: transform, opacity;
`;

export default ModalBoxCSS;
