import React, { useContext } from 'react';
import { ModalOverlayContext } from '../ModalOverlay';
import { mq, theme } from '../../../../styles/global';
import styled from '@emotion/styled';
import CloseIcon from '../../../../public/icon/Close';

// noinspection CssUnknownProperty,CssInvalidPropertyValue
const Button = styled.button`
    -webkit-appearance: none;
    position: absolute;
    top: 1rem;
    right: 0.5rem;
    z-index: 12;
    width: 2.75rem;
    height: 2.75rem;
    font-size: 1.5rem;
    font-weight: 500;
    background-color: transparent;
    cursor: pointer;
    border: none;
    outline: none;

    @media ${mq.min.small} {
        right: 1rem;
    }

    &::before {
        content: '';
        width: 1.5625rem;
        height: 1.5625rem;
        border-radius: 8px;
        background-color: #880f1c;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        z-index: -1;
        transition: background-color 150ms ease-out;
    }

    &:hover,
    &:focus {
        &::before {
            background-color: ${theme.colors.grey};
        }
    }

    &.inverted {
        top: 2rem;
        &::before {
            background-color: transparent;
        }
        > div {
            background-color: ${theme.colors.white};
        }
    }
    &.has-text {
        font-size: 0.875rem;
        font-weight: bold;
        color: ${theme.colors.greyTypeLight};
        width: unset;
        height: unset;
        padding: 0.75rem 1.5rem;
        background-color: #151616;
        border-radius: 6px;
        transition: background-color 150ms ease-out;

        &:hover {
            background-color: #2a2c2c;
        }
    }
`;

export default props => {
    const { whiteOnBlack, closeAsText } = props;
    const useModalOverlayContext = useContext(ModalOverlayContext);

    return (
        <Button
            className={`modal-overlay--button${whiteOnBlack ? ' inverted' : ''}${closeAsText ? ' has-text' : ''}`}
            onClick={() => useModalOverlayContext.stateChangeHandler(false)}
            aria-label={'Sluiten'}
        >
            {closeAsText ? (
                'Sluiten'
            ) : (
                <>
                    <CloseIcon />
                </>
            )}
        </Button>
    );
};
