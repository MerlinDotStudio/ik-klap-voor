import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header/Header';
import { Button } from '../components/Button';
import { css } from '@emotion/core';
import { motion } from 'framer-motion';
import {
    BigText,
    BlueGradientBackground,
    BottomPosition,
    ButtonHolder,
    ContentWrapper,
    defaultHeaderProps,
    fade,
    textVariants,
} from './index';
import Select from 'react-select';
import { theme } from '../styles/global';
import Link from 'next/link';
import { ClapModalOverlayContext } from '../components/Modal/ModalOverlay/ClapModalOverlay';
import { options } from './speciaal-bericht';
import ClapModal from '../components/Modal/ClapModal';
import styled from '@emotion/styled';
import * as Fuse from 'fuse.js';
import { format } from 'date-fns'
import { nl } from "date-fns/locale";

const Messages = styled(motion.ul)`
    padding: 0;
    margin: 0;
    li {
        list-style-type: none;
        padding: 1rem;
        background-color: white;
        border-radius: 4px;
        box-shadow: 0 -2px 10px 0 rgba(0, 0, 0, 0.16);
        margin-bottom: 1rem;
        .title {
            font-size: 1.5626rem;
            color: #80d0c7;
            margin: .5rem 0 1rem;

            strong {
                color: black;
                margin-right: 0.5rem;
            }
        }
        .text {
            font-size: 1.125rem;
        }
        footer {
            color: #333;
            font-size: 0.9375rem;
        }
    }
`;

const AllSupport = () => {
    const useClapModalOverlayContext = useContext(ClapModalOverlayContext);
    const data = {
        applaud: 123,
        beroepen: 23,
        meesteBeroep: '🧑‍⚕️ De artsen',
    };

    const searchResults = [
        {
            for: '🌍 Iedereen',
            text:
                'Kudo’s naar iedereen die zich zó goed aan het advies houd van het RIVM en thuis werkt! Alleen maar liefde!',
            date: Date.now(),
        },
        {
            for: '🌍 Iedereen',
            text:
                'Kudo’s naar iedereen die zich zó goed aan het advies houd van het RIVM en thuis werkt! Alleen maar liefde!',
            date: Date.now(),
        },
        {
            for: '🌍 Artsen',
            text:
                'Kudo’s naar iedereen die zich zó goed aan het advies houd van het RIVM en thuis werkt! Alleen maar liefde!',
            date: Date.now(),
        },
        {
            for: '🌍 Dokters',
            text:
                'Kudo’s naar iedereen die zich zó goed aan het advies houd van het RIVM en thuis werkt! Alleen maar liefde!',
            date: Date.now(),
        },
    ];

    const [searchValue, setSearchValue] = useState(null);
    const searchOptions = {
        shouldSort: true,
        threshold: 0.6,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: ['for', 'text', 'date'],
    };

    const fuse = new Fuse(searchResults, searchOptions);

    function getSearchResults() {
        const result = searchValue ? fuse.search(searchValue) : searchResults;

        return (
            <Messages variants={textVariants}>
                {result.length ? (
                    result.map((result, i) =>
                        result.item ? (
                            <motion.li key={i} variants={textVariants}>
                                <p className={'title'}>
                                    <strong>Aan</strong>
                                    {result.item.for}
                                </p>
                                <p className={'text'}>{result.item.text}</p>
                                <footer>{format(new Date(result.item.date), 'PPpp', {locale: nl})}</footer>
                            </motion.li>
                        ) : (
                            <motion.li key={i} variants={textVariants}>
                                <p className={'title'}>
                                    <strong>Aan</strong>
                                    {result.for}
                                </p>
                                <p className={'text'}>{result.text}</p>
                                <footer>{format(new Date(result.date), 'PPpp', {locale: nl})}</footer>
                            </motion.li>
                        ),
                    )
                ) : (
                    <p
                        css={css`
                            color: white;
                            font-size: 1.5rem;
                            margin: 1rem auto;
                            a {
                                color: white;
                            }
                        `}
                    >
                        Geen resultaten...{' '}
                        <Link href={'/suggestie'}>
                            <a className={'normal-link'}>Oeps, ik mis een branche!</a>
                        </Link>
                    </p>
                )}
            </Messages>
        );
    }
    return (
        <BlueGradientBackground invert initial="exit" animate="enter" exit="exit" variants={fade}>
            <Header {...defaultHeaderProps} icon={'️❤️'} />
            <motion.div initial="exit" animate="enter" exit="exit" variants={textVariants}>
                <main>
                    <ContentWrapper
                        variants={textVariants}
                        css={css`
                            align-content: flex-start;
                        `}
                    >
                        <BigText variants={textVariants}>
                            <div>
                                <p>
                                    Er is al <strong>{data.applaud} keer</strong> 👏 geapplaudisseerd, voor{' '}
                                    <strong>{data.beroepen}</strong> verschillende beroeps groepen! De populairste
                                    beroeps groep is: <strong>{data.meesteBeroep}</strong>!
                                </p>
                            </div>
                        </BigText>
                        <ButtonHolder variants={textVariants}>
                            {/*Message should be sent to Firebase*/}
                            <Button key={2} icon={'👏'} to={'/applaus-voor'}>
                                Applaudisseer
                            </Button>
                        </ButtonHolder>
                        <motion.div variants={textVariants}>
                            <Select
                                options={options}
                                isClearable={true}
                                placeholder={'🔍 Filter berichten op...'}
                                styles={{
                                    placeholder: base => ({
                                        ...base,
                                        fontSize: '1.125rem',
                                        color: '#707070',
                                        fontWeight: 400,
                                        paddingLeft: '.35rem',
                                    }),
                                    indicatorSeparator: () => ({
                                        display: 'none',
                                    }),
                                    dropdownIndicator: base => ({
                                        ...base,
                                        color: theme.colors.grey,
                                    }),
                                    control: base => ({
                                        ...base,
                                        height: '3.4375rem',
                                        boxShadow: 'inset 0 1px 3px 0 rgba(15,31,44,0.1)',
                                        borderRadius: '8px',
                                        border: `1px solid ${theme.colors.white}`,
                                        margin: '4rem 0 2rem',
                                    }),
                                }}
                                onChange={e => setSearchValue(e.value)}
                            />
                        </motion.div>
                        {getSearchResults(searchValue)}
                    </ContentWrapper>
                </main>
            </motion.div>
            <ClapModal />
        </BlueGradientBackground>
    );
};

export default AllSupport;
