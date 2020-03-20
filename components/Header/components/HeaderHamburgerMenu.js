import React, { useContext, useState } from 'react';
import HamburgerIcon from '../../../public/icons/Hamburger';
import styled from '@emotion/styled';
import useKeyPress from '../../../utils/useKeypress';
import { AnimatePresence, motion } from 'framer-motion';
import { theme } from '../../../styles/global';
import { css } from '@emotion/core';
import Link from 'next/link';
import { HeaderLanguageSelector } from '../_Components';
import { HasNotification } from '../../../pages';
import { ModalOverlayContext } from '../../Modal/ModalOverlay/ModalOverlay';

const HeaderHamburgerMenu = props => {
    const [menuOpen, toggleMenuOpen] = useState(false);

	useKeyPress('Escape', () => {
		if(menuOpen) toggleMenu('close')
	});

    function toggleMenu(state) {
        if (state && state === 'close' && menuOpen) {
            toggleMenuOpen(false);
            return;
        }
        toggleMenuOpen(!menuOpen);
    }

    const SideBar = styled(motion.nav)`
        width: 90%;
        height: 100%;
        position: fixed;
        display: flex;
        justify-content: center;
        align-items: flex-end;
        flex-flow: column wrap;
        padding: 10% 2rem;
        right: 0;
        top: 0;
        background-color: ${theme.colors.white};
        z-index: 2;
        max-width: 40rem;
        box-shadow: -10px 10px 10px 0px rgba(0,0,0,.16);
    `;

    const Button = styled.button`
        -webkit-appearance: none;
        border: 0;
        background: none;
        width: 3rem;
        height: 3rem;
        cursor: pointer;
        z-index: 3;
        position:relative;
    `;

    const List = styled(motion.ul)`
        padding: 0;
        margin: 0;
        display: flex;
        flex-flow: column wrap;
        align-items: flex-end;
    `;
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delay: 0.2,
                duration: 0.35,
                delayChildren: 0.25,
            },
        },
    };

    const item = {
        hidden: { opacity: 0, scale: 0, x: 40 },
        show: { opacity: 1, scale: 1, x: 0 },
    };

    const links = [
        {
            text: '🏠 Home',
            href: '/',
        },
        {
            text: '👏 Applaudisseer',
            href: '/applaus-voor',
        },
        {
            text: '💌 Stuur een bericht',
            href: '/speciaal-bericht',
        },
        {
            text: '❤️ Bekijk alle steun',
            href: '/alle-steun',
        },
        {
            text: '🤷 Over het initiatief',
            href: '/over-het-initiatief',
        },
		{
            text: '💡 Ook een tof idee?',
            href: '/suggestie',
        },
    ];

    const StyledLink = styled(motion.li)`
        font-size: calc(1rem + 1vh);
        white-space: nowrap;
        font-weight: bold;
        margin-bottom: calc(1.5rem + 5%);
        text-align: right;
        position:relative;
        display: inline-block;
        width: fit-content;

        &::first-letter {
            text-transform: capitalize;
        }

		> div {
			right: auto;
			left: -1.75rem;
			top: -0.25rem;
			z-index: 1;
		}

        a {
        	display: inline-block;
            color: ${theme.colors.black};

            &::first-letter {
                text-transform: capitalize;
            }
        }
    `;

    const MobileHeaderLanguageSelector = styled(motion.div)`
        button {
            padding: 1.5rem;
            display: block;
            margin-bottom: 1rem;

            &:hover {
                background-color: transparent;
            }

            svg {
                left: 0;
                width: 1.5rem;
                height: 1.5rem;
            }

            span {
                display: none;
            }
        }

        ul[aria-expanded] {
            right: auto;
            left: 0;
        }
    `;

	const BackgroundGradient = styled(motion.div)`
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		z-index: 1;
		background-color: rgba(0, 0, 0, .16);
	`
	const useModalOverlayContext = useContext(ModalOverlayContext);

    return (
        <div>
            <Button onClick={() => toggleMenu()} title={'open menu'} aria-label={'open menu'} aria-expanded={menuOpen}>
                <HamburgerIcon closed={menuOpen} />
            </Button>
            <AnimatePresence initial={false}>
                {menuOpen && (
                    <>
						<SideBar
							initial={{ x: '100%' }}
							animate={{ x: '0%' }}
							exit={{ x: '100%' }}
							css={css`
                            visibility: ${menuOpen ? 'visible' : 'hidden'};
                            pointer-events: ${menuOpen ? 'auto' : 'none'};
                        `}
							aria-hidden={!menuOpen}
							aria-live={'polite'}
						>
							{/*<MobileHeaderLanguageSelector variants={item}>*/}
							{/*    <HeaderLanguageSelector />*/}
							{/*</MobileHeaderLanguageSelector>*/}
							<List
								variants={container}
								initial="hidden"
								animate="show"
							>
								{links.map((link, i) => (
									<StyledLink onClick={()=>toggleMenu()} key={`${i}`} variants={item} whileHover={{
										scale: 1.05,
										rotate: '-1deg',
										transition: { duration: .25 },
									}} whileTap={{ scale: 0.9 }}>
										{i === 1 ? <HasNotification>{useModalOverlayContext.applausAmount}</HasNotification> : null}
										{i === 2 ? <HasNotification>{useModalOverlayContext.messageAmount}</HasNotification> : null}
										<Link href={link.href}><a>{link.text}</a></Link>
									</StyledLink>
								))}
							</List>
						</SideBar>
						<BackgroundGradient onClick={() => toggleMenu()} initial={{ opacity: 0 }}
											animate={{ opacity: 1 }}
											exit={{ opacity: 0 }}
											css={css`
                            visibility: ${menuOpen ? 'visible' : 'hidden'};
                            pointer-events: ${menuOpen ? 'auto' : 'none'};
                        `}
							aria-hidden={'true'}
						/>
					</>
                )}
            </AnimatePresence>
        </div>
    );
};

export default HeaderHamburgerMenu;
