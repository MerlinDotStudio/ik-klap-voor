import React, { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { theme } from '../../../styles/global';
import { motion } from 'framer-motion';
import IconFlagNetherlands from '../../../public/icons/flags/netherlands';
import IconFlagEnglish from '../../../public/icons/flags/united-kingdom';
import CheckmarkRoundBlue from '../../../public/icons/CheckmarkRoundBlue';

const HeaderLanguageSelector = () => {
    const [showLanguageSelector, toggleShowLanguageSelector] = useState(false);

    function handleClick(value) {
        toggleShowLanguageSelector(value);
    }
    const node = useRef(null);
    function handleClickOutside(e) {
        if (node && node.current && node.current.contains(e.target)) {
            return;
        }
        // outside click
        if (showLanguageSelector) handleClick(false);
    }

    useEffect(() => {
        if (showLanguageSelector) {
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('touchstart', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
        };
    });

    // function handleKeypress() {
    //     if (showLanguageSelector) {
    //         toggleShowLanguageSelector(false);
    //         document.removeEventListener('mousedown', handleClickOutside);
    //         document.removeEventListener('touchstart', handleClickOutside);
    //     }
    // }

    const LanguageSelector = styled.div`
        display: flex;
        flex-flow: row wrap;
        justify-content: center;
        align-items: center;
        position: relative;
    `;

    const ToggleDropdown = styled.button`
        border: 0;
        background-color: transparent;
        -webkit-appearance: none;
        font-size: 0.875rem;
        font-weight: 500;
        vertical-align: middle;
        position: relative;
        outline: none;
        transition: background-color 150ms ease-out;
        cursor: pointer;
        border-radius: 0.5rem;
        padding: 1rem 1rem 1rem 2.5rem;
        height: 3rem;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        text-decoration: none;
        color: ${theme.colors.black};
        margin: 0.25rem 0;

        &.active {
            border: solid 1px ${theme.colors.burpleLight};
        }

        &:hover,
        &:focus {
            background-color: ${theme.colors.whiteDarken};
        }

        svg {
            width: 1rem;
            height: 1rem;
            position: absolute;
            top: 50%;
            left: 0.75rem;
            transform: translateY(-50%);
        }
    `;

    const Dropdown = styled(motion.ul)`
        position: absolute;
        z-index: 10;
        top: 3.8rem;
        right: 5%;
        background-color: ${theme.colors.white};
        box-shadow: 0 6px 25px 0 rgba(123, 123, 123, 0.16);
        padding: 0.25rem 1rem;
        margin: 0;
        pointer-events: none;

        &[aria-expanded='true'] {
            pointer-events: auto;
        }
    `;

    const LanguageLink = styled.a`
        border: 0;
        background-color: transparent;
        -webkit-appearance: none;
        font-size: 0.875rem;
        font-weight: 500;
        vertical-align: middle;
        position: relative;
        outline: none;
        transition: background-color 150ms ease-out;
        cursor: pointer;
        border-radius: 0.5rem;
        padding: 1rem 2.5rem;
        height: 3rem;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        text-decoration: none;
        color: ${theme.colors.black};
        margin: 0.25rem 0;

        &.active {
            border: solid 1px ${theme.colors.burpleLight};
        }

        &:hover,
        &:focus {
            background-color: ${theme.colors.whiteDarken};
        }

        svg {
            width: 1rem;
            height: 1rem;
            position: absolute;
            top: 50%;
            left: 0.75rem;
            transform: translateY(-50%);
        }

        svg:nth-of-type(2) {
            width: 0.75rem;
            height: 0.75rem;
            position: absolute;
            top: 50%;
            right: 0.75rem;
            left: auto;
            fill: ${theme.colors.burple};
            transform: translateY(-50%);
        }
    `;

    return (
        <LanguageSelector>
            <ToggleDropdown
                onClick={() => {
                    handleClick(!showLanguageSelector);
                }}
                aria-label={'Dutch'}
            >
                {i18n.language === 'nl' ? (
                    <>
                        <IconFlagNetherlands />
                        <span>Nederlands</span>
                    </>
                ) : (
                    <>
                        <IconFlagEnglish />
                        <span>English</span>
                    </>
                )}
            </ToggleDropdown>
            <Dropdown
                ref={node}
                initial={{
                    opacity: 0,
                    y: '-1rem',
                    visibility: 'hidden',
                }}
                animate={{
                    y: showLanguageSelector ? '0rem' : '-1rem',
                    opacity: showLanguageSelector ? 1 : 0,
                    visibility: showLanguageSelector ? 'visible' : 'hidden',
                }}
                transition={{
                    duration: 0.15,
                }}
                aria-expanded={showLanguageSelector}
            >
                <li>
                    <LanguageLink
                        title="English page"
                        hrefLang="en"
                        rel="alternate"
                        onClick={() => {
                            handleClick(false);
                            i18n.changeLanguage('en');
                        }}
                    >
                        <IconFlagEnglish />
                        <span>English</span>
                        {i18n.language === 'en' ? <CheckmarkRoundBlue /> : null}
                    </LanguageLink>
                </li>
                <li>
                    <LanguageLink
                        title="English page"
                        className={'language-selector__button'}
                        hrefLang="en"
                        rel="alternate"
                        onClick={() => {
                            handleClick(false);
                            i18n.changeLanguage('nl');
                        }}
                    >
                        <IconFlagNetherlands />
                        <span>Nederlands</span>
                        {i18n.language === 'nl' ? <CheckmarkRoundBlue /> : null}
                    </LanguageLink>
                </li>
            </Dropdown>
        </LanguageSelector>
    );
};

export default HeaderLanguageSelector;
