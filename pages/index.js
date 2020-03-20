import React, { useContext } from 'react';
import styled from '@emotion/styled';
import Header from '../components/Header/Header';
import { theme } from '../styles/global';
import { Button } from '../components/Button';
import { css } from '@emotion/core';
import { motion } from 'framer-motion';
import firebase from 'firebase';
import { ModalOverlayContext } from '../components/Modal/ModalOverlay/ModalOverlay';

export const firebaseConfig = {
	apiKey: process.env.apiKey,
	authDomain: process.env.authDomain,
	databaseURL: process.env.databaseURL,
	projectId: process.env.projectId,
	storageBucket: process.env.storageBucket,
	messagingSenderId: process.env.messagingSenderId,
	appId: process.env.appId,
	measurementId: process.env.measurementId,
};

if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig);
}

export function incrementCertainApplaus(doc){
	const db = firebase.firestore()
	const increment = firebase.firestore.FieldValue.increment(1);
	// Document reference
	console.log(doc);
	const docRef = db.collection('applaus').doc(doc);
	// Update read count
	docRef.update({ number: increment });
}

const ContainerForm = styled.form`
    width: 2.75rem;
    height: 2.75rem;
    position: absolute;
    right: 0.5rem;
    top: 65%;
    z-index: 2;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: transform 200ms ease-out;
    cursor: pointer;
    transform-origin: center;

    &:hover {
        .heart-svg {
            fill: ${theme.colors.primary};
            transform: scale(1.1);
        }
    }

    button {
        width: 2.75rem;
        height: 2.75rem;
        border: 0;
        background: none;
        padding: 0;
        position: absolute;
        top: 0;
        left: 0;
        outline: none;
        cursor: pointer;

        &:active {
            + .icon .heart-svg {
                transform: scale(0.6);
            }
        }
    }
`;

export const BlueGradientBackground = styled(motion.div)`
    background-image: linear-gradient(0deg, ${theme.colors.darkBlue} 0%, ${theme.colors.lightBlue} 100%);
    position: fixed;
    z-index: 0;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    overflow-y: auto;
    &::-webkit-scrollbar {
        width: 8px;
        height: 8px;
        transition: all 300ms ease-in-out;
    }
    &::-webkit-scrollbar-button {
        width: 0;
        height: 0;
        transition: all 300ms ease-in-out;
    }
    &::-webkit-scrollbar-thumb {
        background: #80d0c7;
        border: 0 none #ffffff;
        border-radius: 0;
        transition: all 300ms ease-in-out;
    }
    &::-webkit-scrollbar-thumb:hover {
        background: #13547a;
    }
    &::-webkit-scrollbar-thumb:active {
        background: #13547a;
    }
    &::-webkit-scrollbar-track {
        background: #13547a;
        border-radius: 0;
        transition: all 300ms ease-in-out;
    }
    &::-webkit-scrollbar-track:hover {
        background: #80d0c7;
    }
    &::-webkit-scrollbar-track:active {
        background: #333333;
    }
    &::-webkit-scrollbar-corner {
        background: transparent;
        transition: all 300ms ease-in-out;
    }
`;
export const BlackGradientBackground = styled(motion.div)`
    background-image: ${props =>
        props.invert
            ? `linear-gradient(180deg, ${theme.colors.black} 0%, #434343 100%)`
            : `linear-gradient(180deg, #434343 0%, ${theme.colors.black} 100%)`};
    position: fixed;
    z-index: 0;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    overflow-y: auto;
    &::-webkit-scrollbar {
        width: 8px;
        height: 8px;
        transition: all 300ms ease-in-out;
    }
    &::-webkit-scrollbar-button {
        width: 0;
        height: 0;
        transition: all 300ms ease-in-out;
    }
    &::-webkit-scrollbar-thumb {
        background: #434343;
        border: 0 none #ffffff;
        border-radius: 0;
        transition: all 300ms ease-in-out;
    }
    &::-webkit-scrollbar-thumb:hover {
        background: ${theme.colors.black};
    }
    &::-webkit-scrollbar-thumb:active {
        background: ${theme.colors.black};
    }
    &::-webkit-scrollbar-track {
        background: ${theme.colors.black};
        border-radius: 0;
        transition: all 300ms ease-in-out;
    }
    &::-webkit-scrollbar-track:hover {
        background: #434343;
    }
    &::-webkit-scrollbar-track:active {
        background: #333333;
    }
    &::-webkit-scrollbar-corner {
        background: transparent;
        transition: all 300ms ease-in-out;
    }
`;
export const defaultHeaderProps = {
    languageSelector: false,
    registerLink: false,
    loginLink: false,
    loginSidebar: false,
    loggedIn: false,
    chat: false,
    hasChatNotification: false,
    hasProfileNotification: false,
};

export const BigText = styled(motion.div)`
    font-size: calc(1.875rem + 1vh);
    color: white;
    max-width: 40rem;
    margin: 2rem auto;
    strong {
        font-weight: bold;
    }
    p {
        margin: 0 auto calc(1.875rem + 1vh);
    }
    a {
        color: white;
        text-decoration: none;
        border-bottom: 1px solid white;
    }
    footer {
        font-size: calc(1.5rem + 1vh);
    }
`;

export const ContentWrapper = styled(motion.article)`
    margin: 0 auto;
    padding: 5% 10%;
    display: flex;
    flex-flow: row wrap;
    align-content: space-between;
    justify-content: center;
    width: 100%;
    min-height: calc(100vh - 4rem);
	max-width: calc(40rem + 20%);

    > * {
    	width: 100%;
    	max-width: 32rem;
    }
`;

export const ButtonHolder = styled(motion.div)`
    width: fit-content;
    margin: 1rem auto;
`;

export const BottomPosition = styled(motion.div)`
    align-self: flex-end;
    text-align: center;

    .normal-link {
        color: white;
        border-bottom: 1px solid white;
        text-decoration: none;
        text-align: center;
        margin: 1rem auto;
        display: inline-block;
    }
`;

export const HasNotification = styled.div`
    border-radius: 3px;
    background-color: ${theme.colors.statusRed};
    color: white;
    padding: 0.25rem;
    width: 1.875rem;
    position: absolute;
    z-index: 1;
    right: 0;
    top: 0;
    transform: translate(20%, -20%);
    text-align: center;
    font-size: 0.75rem;
`;

export const staggerTransition = {
    staggerChildren: 0.75,
    duration: 0.85,
    delayChildren: 0.5,
};

export const textVariants = {
    exit: {
        y: 20,
        opacity: 0,
        transition: staggerTransition,
    },
    enter: {
        y: 0,
        opacity: 1,
        transition: staggerTransition,
    },
};

export const fade = {
    exit: { opacity: 0 },
    enter: { opacity: 1 },
};

const HomePage = () => {
	const useModalOverlayContext = useContext(ModalOverlayContext);

    return (
        <BlueGradientBackground initial="exit" animate="enter" exit="exit" variants={fade}>
            <Header hasAmount={true} amount={useModalOverlayContext.applausAmount} {...defaultHeaderProps} />
            <motion.div initial="exit" animate="enter" exit="exit" variants={textVariants}>
                <main>
                    <ContentWrapper variants={textVariants}>
                        <BigText variants={textVariants}>
                            <div>
                                <p>
                                    Geef <strong>steun</strong> aan de eerste linie <strong>Corona bestrijders</strong>{' '}
                                    en de <strong>andere helden</strong> die ons land draaiend houden.
                                </p>
                            </div>
                        </BigText>
                        <ActionButtons />
                    </ContentWrapper>
                </main>
            </motion.div>
        </BlueGradientBackground>
    );
};

const ActionButtons = () => {
	return (
        <BottomPosition>
            <ButtonHolder variants={textVariants}>
                <Button
                    icon={'👏'}
                    styles={css`
                        color: #80d0c7;
                        margin-bottom: 1rem;
                    `}
                    key={1}
                    to={'/applaus-voor'}
                >
                    Applaudisseer
                </Button>
                <Button key={2} icon={'💌'} to={'/speciaal-bericht'}>
                    Stuur een bericht
                </Button>
            </ButtonHolder>
        </BottomPosition>
    );
};

export default HomePage;
