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
import ClapModal from '../components/Modal/ClapModal';
import styled from '@emotion/styled';
import * as Fuse from 'fuse.js';
import { format } from 'date-fns';
import { nl } from 'date-fns/locale';
import { ModalOverlayContext } from '../components/Modal/ModalOverlay/ModalOverlay';
import firebase from 'firebase';

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
            font-size: calc(1.25rem + 1vh);
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
								date: message.date
							})
						})
                        // dataObject.push({
                        //     name: docData.name,
                        //     messages: messageArray,
                        // });
						const sortByNew = dataObject.sort(function(a,b){
							// Turn your strings into dates, and then subtract them
							// to get a value that is either negative, positive, or zero.
							return new Date(b.date) - new Date(a.date);
						});
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

    function getSearchResults() {
        const fuse = new Fuse(messages, searchOptions);
        const workFieldTypes = searchValue ? fuse.search(searchValue) : messages;

        return (
            <Messages variants={textVariants}>
				{workFieldTypes && workFieldTypes.length ? (
					workFieldTypes.map((type, i) => {
						const { name, messages } = type;
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
						)
					})
				)
				 : (
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
                                    <strong>{data.beroepen}</strong> verschillende beroeps groepen! De meest benoemde
                                    groep is: <strong>{data.meesteBeroep}</strong>!
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
                                        margin: '4rem 0 2rem',
                                    }),
                                }}
                                onChange={e => e && e.value ? setSearchValue(e.value) : setSearchValue(null)}
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
