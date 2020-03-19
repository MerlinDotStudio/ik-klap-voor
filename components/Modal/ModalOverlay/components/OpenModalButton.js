import React, { useContext } from 'react';
import { ModalOverlayContext } from '../ModalOverlay';
import styled from '@emotion/styled';
import { theme } from '../../../../styles/global';

const Button = styled.button`
    width: 10rem;
    height: 3rem;
    background-color: ${theme.colors.secondary};
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 1rem;
    color: ${theme.colors.white};
    outline: none;
    transition: background-color 250ms ease-out, color 250ms ease-out, border 250ms ease-out;

    position: fixed;
    left: 1rem;
    bottom: 1rem;

    &:active {
        background-color: ${theme.colors.white};
        color: ${theme.colors.white};
        border-color: ${theme.colors.white};
    }
`;

export default props => {
    const useModalOverlayContext = useContext(ModalOverlayContext);

    return <Button onClick={() => useModalOverlayContext.stateChangeHandler(true)}>{props.text}</Button>;
};
