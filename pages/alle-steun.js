import React, { useContext, useEffect, useState, Suspense } from 'react';
import Header from '../components/Header/Header';
import { Button } from '../components/Button';
import { css } from '@emotion/core';
import { motion } from 'framer-motion';
import {
    BigText,
    BlueGradientBackground,
    ButtonHolder,
    ContentWrapper,
    defaultHeaderProps,
    fade,
    textVariants,
} from './index';
import Select from 'react-select';
import { mq, theme } from '../styles/global';
import Link from 'next/link';
import ClapModal from '../components/Modal/ClapModal';
import styled from '@emotion/styled';
import * as Fuse from 'fuse.js';
import { format } from 'date-fns';
import { nl } from 'date-fns/locale';
import { ModalOverlayContext } from '../components/Modal/ModalOverlay/ModalOverlay';
import firebase from 'firebase';
import {
    FacebookIcon,
    FacebookShareButton,
    LinkedinIcon,
    LinkedinShareButton,
    TwitterIcon,
    TwitterShareButton,
    WhatsappIcon,
    WhatsappShareButton,
} from 'react-share';
import { InView, useInView } from 'react-intersection-observer';

const Messages = styled(motion.ul)`
    padding: 0 7.5% 5%;
    margin: 0 auto;

    li {
        list-style-type: none;
        padding: 1rem;
        background-color: white;
        border-radius: 4px;
        box-shadow: 0 -2px 10px 0 rgba(0, 0, 0, 0.16);
        margin-bottom: 1rem;
        .title {
            font-size: 1.25rem;
            color: #80d0c7;
            margin: 0.5rem 0 1rem;

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

    @media ${mq.min.medium} {
        display: grid;
        grid-gap: 1rem;
        grid-template-columns: 1fr 1fr 1fr;
        width: 100vw;

        li {
            margin-bottom: 0;
        }
    }
`;

const AllSupport = () => {
    const useModalOverlayContext = useContext(ModalOverlayContext);
    const [profession, setProfession] = useState(
        useModalOverlayContext.options && useModalOverlayContext.options.length,
    );
    let [messages, setMessages] = useState([
        {
            name: '',
            bericht: '',
            date: Date.now(),
        },
        {
            name: '',
            bericht: '',
            date: Date.now(),
        },
        {
            name: '',
            bericht: '',
            date: Date.now(),
        },
    ]);
    const [searchValue, setSearchValue] = useState('');
    const [lazyValue, setLazyValue] = useState(10);

    const [mostProfession, setMostProfession] = useState({
        name: '🌍 Iedereen',
        number: 0,
    });

    const data = {
        applaud: useModalOverlayContext.applausAmount,
        beroepen: profession,
        meesteBeroep: mostProfession.name,
    };

    useEffect(() => {
        const db = firebase.firestore();
        const applauseData = db.collection('applaus').get();
        applauseData.then(snapshot => {
            const values = [];
            let highestValue = {
                name: '🌍 Iedereen',
                number: 0,
            }; //name goes here
            snapshot.forEach(doc => {
                const docData = doc.data();
                if (docData.number > highestValue.number)
                    highestValue = {
                        name: docData.name,
                        number: docData.number,
                    };
                values.push(docData);
            });
            // -1 because of "iedereen"
            setProfession(values.length - 1);
            setMostProfession(highestValue);
        });

        const messageData = db.collection('berichten').get();
        messageData.then(snapshot => {
            const dataObject = [];
            snapshot.forEach(doc => {
                const docData = doc.data();
                const messageArray = [];
                // doc.id = iedereen, artsen, brandweer
                db.collection('berichten')
                    .doc(doc.id)
                    .collection('messages')
                    .get()
                    .then(data2 => {
                        data2.forEach(item => {
                            const docData2 = item.data();
                            messageArray.push(docData2.messages);
                        });
                        messageArray.forEach(message => {
                            dataObject.push({
                                name: docData.name,
                                bericht: message.bericht,
                                date: message.date,
                            });
                        });
                        const sortByNew = dataObject.sort((a, b) => new Date(b.date) - new Date(a.date));
                        setMessages(sortByNew);
                    });
            });
        });
    }, [profession]);

    const searchOptions = {
        shouldSort: true,
        threshold: 0.25,
        location: 0,
        distance: 60,
        maxPatternLength: 32,
        minMatchCharLength: 3,
        keys: ['name', 'messages.bericht', 'messages.date'],
    };

    function getSearchResults(startAmount, maxAmount) {
        const fuse = new Fuse(messages, searchOptions);
        const workFieldTypes = searchValue ? fuse.search(searchValue) : messages;
        if (workFieldTypes && workFieldTypes.length) {
            workFieldTypes.splice(maxAmount, workFieldTypes.length);
            workFieldTypes.splice(0, startAmount);
        }
        return (
            <Messages variants={textVariants}>
                {workFieldTypes && workFieldTypes.length ? (
                    workFieldTypes.map((type, i) => {
                        return type.item ? (
                            <motion.li key={`${i}`} variants={textVariants}>
                                <p className={'title'}>
                                    <strong>Aan</strong>
                                    {type.item.name}
                                </p>
                                <p className={'text'}>{type.item.bericht}</p>
                                <footer>{format(new Date(type.item.date), 'PPpp', { locale: nl })}</footer>
                            </motion.li>
                        ) : (
                            <motion.li key={`${i}`} variants={textVariants}>
                                <p className={'title'}>
                                    <strong>Aan</strong>
                                    {type.name}
                                </p>
                                <p className={'text'}>{type.bericht}</p>
                                <footer>{format(new Date(type.date), 'PPpp', { locale: nl })}</footer>
                            </motion.li>
                        );
                    })
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

    function lazyLoadElements(min, max) {
        return messages.length >= min ? (
            <InView>
                {({ inView, ref, entry }) => (
                    <div
                        ref={ref}
                        css={css`
                            min-height: 5rem;
                        `}
                    >
                        <Suspense fallback={<div>Momentje...</div>}>{inView && getSearchResults(min, max)}</Suspense>
                    </div>
                )}
            </InView>
        ) : null;
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
                            padding-bottom: 0;
                            min-height: unset;

                            @media ${mq.min.medium}{
								justify-content: flex-start;
								align-items: flex-start;
								flex-flow: column wrap;
								max-width: unset;

								> * {
									max-width: 20rem;
									margin-left: 0;
								}
                            }
                        `}
                    >
                        <BigText
                            variants={textVariants}
                            css={css`
                                margin-bottom: 3rem;

                                p {
                                    margin: 0;
                                }

                                @media ${mq.min.medium}{
									max-width: unset !important;

									br:last-of-type {
										display: none;
									}
	                            }
                            `}
                        >
                            <div>
                                <p>
                                    Er is al <strong>{data.applaud} keer</strong> 👏 geapplaudisseerd, voor{' '}
                                    <strong>{data.beroepen}</strong> verschillende beroeps groepen! <br/>De meest benoemde
                                    groep is: <br/><strong>{data.meesteBeroep}</strong>!
                                </p>
                            </div>
                        </BigText>
                        <ButtonHolder variants={textVariants}>
                            <Button key={2} icon={'👏'} to={'/applaus-voor'}>
                                Applaudisseer
                            </Button>
                            <motion.ul
                                variants={textVariants}
                                css={css`
                                    display: flex;
                                    justify-content: center;
                                    padding: 0;
                                    margin: 2rem auto 0;
                                    li {
                                        list-style-type: none;
                                        margin: 0.5rem;
                                    }
                                `}
                            >
                                <li>
                                    <FacebookShareButton
                                        url={'https://ikklapvoor.nl'}
                                        hashtag={'covid19, corona, nederland'}
                                        quote={
                                            'Laten we iedereen die momenteel vecht voor anderen een hart onder de riem steken. Ik heb geklapt voor mijn helden die vechten tegen corona, jij ook?'
                                        }
                                    >
                                        <FacebookIcon size={32} round={true} />
                                    </FacebookShareButton>
                                </li>
                                <li>
                                    <LinkedinShareButton
                                        url={'https://ikklapvoor.nl'}
                                        title={'ik klap voor...'}
                                        summary={
                                            'Laten we iedereen die momenteel vecht voor anderen een hart onder de riem steken. Ik heb geklapt voor mijn helden die vechten tegen corona, jij ook?'
                                        }
                                    >
                                        <LinkedinIcon size={32} round={true} />
                                    </LinkedinShareButton>
                                </li>
                                <li>
                                    <TwitterShareButton
                                        url={'https://ikklapvoor.nl'}
                                        title={
                                            'Laten we iedereen die momenteel vecht voor anderen een hart onder de riem steken. Ik heb geklapt voor mijn helden die vechten tegen corona, jij ook?'
                                        }
                                    >
                                        <TwitterIcon size={32} round={true} />
                                    </TwitterShareButton>
                                </li>
                                <li>
                                    <WhatsappShareButton
                                        url={'https://ikklapvoor.nl'}
                                        title={
                                            'Laten we iedereen die momenteel vecht voor anderen een hart onder de riem steken. Ik heb geklapt voor mijn helden die vechten tegen corona, jij ook?'
                                        }
                                    >
                                        <WhatsappIcon size={32} round={true} />
                                    </WhatsappShareButton>
                                </li>
                            </motion.ul>
                        </ButtonHolder>
                        <motion.div
                            variants={textVariants}
                            css={css`
                                margin: 2rem 0 2rem;
                            `}
                        >
                            <span
                                css={css`
                                    color: white;
                                    margin-bottom: 0.25rem;
                                    display: inline-block;
                                `}
                            >
                                {useModalOverlayContext.messageAmount} berichten.
                            </span>
                            <Select
                                options={useModalOverlayContext.options}
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
                                    }),
                                }}
                                onChange={e => (e && e.value ? setSearchValue(e.value) : setSearchValue(null))}
                            />
                        </motion.div>
                    </ContentWrapper>

                    {typeof window !== 'undefined' ? (
                        <Suspense fallback={<div>Momentje...</div>}>{getSearchResults(0, 32)}</Suspense>
                    ) : null}
                    {lazyLoadElements(32, 64)}
                    {lazyLoadElements(64, 96)}
                    {lazyLoadElements(96, 128)}
                    {lazyLoadElements(128, 160)}
                    {lazyLoadElements(160, 192)}
                    {lazyLoadElements(192, 224)}
                </main>
            </motion.div>
            <ClapModal />
        </BlueGradientBackground>
    );
};

export default AllSupport;
