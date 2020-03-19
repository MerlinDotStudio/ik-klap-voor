import { css } from '@emotion/core';
import { mq, theme } from '../../../../styles/global';

// noinspection CssUnknownProperty,CssInvalidPropertyValue
const ModalBoxCSS = props => css`
    background-color: ${theme.colors.primary};
    color: white;
    border-radius: 1rem;
    box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.1);

    width: ${props.dark ? '100%' : '90%'};
    max-width: ${props.dark ? 'unset' : '50rem'};
    max-height: ${props.dark ? 'unset' : '40rem'};

    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem 2rem 1rem 2rem;

    position: relative;
    z-index: 5;
    overflow: hidden;

    pointer-events: auto;
    transform: scale(0);
    transform-origin: center;
    opacity: 0;
    will-change: transform, opacity;
`;

export default ModalBoxCSS;
