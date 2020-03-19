import React, { useState } from 'react';
import { withTranslation } from 'react-i18next';
import HamburgerIcon from '../../../public/icons/Hamburger';
import styled from '@emotion/styled';
import useKeyPress from '../../../utils/useKeypress';
import { AnimatePresence, motion } from 'framer-motion';
import { theme } from '../../../styles/global';
import { css } from '@emotion/core';
import Link from 'next/link';
import { HeaderLanguageSelector } from '../_Components';

const HeaderHamburgerMenu = props => {
    const { t } = props;
    const [menuOpen, toggleMenuOpen] = useState(false);

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

    useKeyPress('Escape', () => toggleMenu('close'));

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
    `;
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delay: 0.125,
                duration: 0.2,
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
            text: '👏 Applaudisseer',
            href: '/',
        },
        {
            text: '💌 Stuur een bericht',
            href: '/residences',
        },
        {
            text: '❤️ Bekijk alle steun',
            href: '/',
        },
        {
            text: '🤷 Over het initiatief',
            href: '/login',
        },
		{
            text: '💡 Ook een tof idee?',
            href: '/login',
        },
    ];

    const StyledLink = styled(motion.li)`
        font-size: calc(1rem + 2vh);
        white-space: nowrap;
        font-weight: bold;
        margin-bottom: calc(1.5rem + 5%);
        text-align: right;

        &::first-letter {
            text-transform: capitalize;
        }

        a {
        	display: inline-block;
            color: ${theme.colors.black};
			transition: transform 150ms ease-out;

            &::first-letter {
                text-transform: capitalize;
            }

            &:hover, &:focus {
            	transform: scale(1.05) skew(2deg);
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
									<StyledLink key={`${i}`} variants={item}>
										<Link href={link.href}>{link.text}</Link>
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

export default withTranslation('common')(HeaderHamburgerMenu);
