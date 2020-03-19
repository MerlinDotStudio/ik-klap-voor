import { css } from '@emotion/core';

// noinspection CssUnknownProperty
const ModalBoxGradientCSS = props => css`
    background: ${props.dark
        ? 'radial-gradient( circle at center,rgba(0,0,0,0.8) 0,rgba(0,0,0,0.9) 100% )'
        : 'rgba(0, 0, 0, 0.05)'};
    width: 100%;
    height: 100%;
    z-index: 4;
    position: fixed;
    top: 0;
    left: 0;
    display: block;
`;

export default ModalBoxGradientCSS;
