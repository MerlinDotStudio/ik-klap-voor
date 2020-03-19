import React, { useState } from 'react';
import styled from '@emotion/styled';
import useKeyPress from '../../utils/useKeypress';
import { AnimatePresence, motion } from 'framer-motion';
import { theme } from '../../styles/global';
import { css } from '@emotion/core';
import Arrow from '../../public/icons/Arrow';
import useFocusTrap from '@charlietango/use-focus-trap';

const SlidingSidebar = props => {
    const { children, buttonText } = props;
    const [menuOpen, toggleMenuOpen] = useState(false);

    function toggleMenu(state) {
        if (state && state === 'close' && menuOpen) {
            toggleMenuOpen(false);
            return;
        }
        if (state !== 'close') {
            toggleMenuOpen(!menuOpen);
        }
    }

    const SideBar = styled(motion.nav)`
        width: 100%;
        height: calc(100% - 4rem);
        overflow-y: visible;
        max-width: 45.5rem;
        position: fixed;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-flow: column wrap;
        right: 0;
        top: 4rem;
        background-color: ${theme.colors.white};
        z-index: 9;
        padding-right: 10rem;
        margin-right: -10rem;
        box-shadow: 0 1rem 20px 0 rgba(99, 99, 99, 0.46);
    `;

    const focusTrap = useFocusTrap(menuOpen);
    useKeyPress('Escape', () => toggleMenu('close'));

    const Button = styled.button`
        -webkit-appearance: none;
        border: 0;
        background: none;
        width: 3rem;
        height: 3rem;
        cursor: pointer;
        outline: none;

        svg {
            transition: transform 150ms ease-out;
        }

        &:hover {
            svg {
                transform: translateX(1rem);
            }
        }
    `;

    const BackgroundOverlay = styled(motion.div)`
        background-color: ${theme.colors.black};
        opacity: 0.5;
        width: 100%;
        height: 100%;
        left: 0;
        top: 4rem;
        position: fixed;
    `;

    const HeaderLink = styled.button`
        -webkit-appearance: none;
        border: 0;
        background: none;
        cursor: pointer;

        font-size: 0.875rem;
        font-weight: 500;
        color: ${theme.colors.greyType};
        text-transform: capitalize;
        transition: color 150ms ease-out;

        &:hover,
        &:focus {
            color: ${theme.colors.grey};
        }
    `;

    return (
        <div>
            <HeaderLink onClick={() => toggleMenu()}>{buttonText}</HeaderLink>
            <AnimatePresence initial={false}>
                {menuOpen && (
                    <>
                        <SideBar
                            ref={focusTrap}
                            initial={{ x: '100%' }}
                            animate={{ x: '0%' }}
                            exit={{ x: '100%' }}
                            css={css`
                                visibility: ${menuOpen ? 'visible' : 'hidden'};
                                pointer-events: ${menuOpen ? 'auto' : 'none'};
                            `}
                        >
                            <>
                                <Button
                                    onClick={() => toggleMenu()}
                                    css={css`
                                        cursor: pointer;
                                        position: absolute;
                                        top: 1rem;
                                        left: 1rem;
                                        z-index: 9;
                                    `}
                                >
                                    <Arrow color={'#3d4c57'} />
                                </Button>
                                {children}
                            </>
                        </SideBar>
                        <BackgroundOverlay
                            onClick={() => toggleMenu()}
                            initial={{ opacity: '0' }}
                            animate={{ opacity: '0.5' }}
                            exit={{ opacity: '0' }}
                            css={css`
                                visibility: ${menuOpen ? 'visible' : 'hidden'};
                                pointer-events: ${menuOpen ? 'auto' : 'none'};
                            `}
                        />
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default SlidingSidebar;
