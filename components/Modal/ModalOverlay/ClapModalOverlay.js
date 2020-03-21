import React, { useState, useContext, useEffect } from 'react';
import { ModalOverlay, ModalBoxCSS, ModalBoxGradientCSS } from './_Components';
import { motion } from 'framer-motion';
import CloseModalButton from './components/CloseModalButton';
import Router from 'next/router'
import { staggerTransition } from '../../../pages';
import CloseClapModalButton from './components/CloseClapModalButton';
import useKeyPress from '../../../utils/useKeypress';
export const ClapModalOverlayContext = React.createContext(undefined);

// create the provider
export const ClapModalOverlayContextProvider = props => {
    const [modalOpenState, setModalOpenState] = useState(false);

    return (
        <ClapModalOverlayContext.Provider
            value={{
                isOpen: modalOpenState,
                toggleModal: () => {
                    setModalOpenState(!modalOpenState);
                    document.body.classList.toggle('has-overlay');
                },
                stateChangeHandler: newState => {
                    setModalOpenState(newState);
                    document.body.classList.toggle('has-overlay');
					if(newState === true) {
						const audio = new Audio('/sounds/clapping.mp3');
						audio.play();
					}
					if(newState === false) Router.push('/alle-steun')
                },
            }}
        >
            {props.children}
        </ClapModalOverlayContext.Provider>
    );
};

export default ({ children, dark = false, closeAsText = false }) => {
    const useClapModalOverlayContext = useContext(ClapModalOverlayContext);
    const darkVersion = dark;

	const ModalTransition = staggerTransition
	ModalTransition.duration = .5
	ModalTransition.staggerChildren = .25
	ModalTransition.delayChildren = .25

	useKeyPress('Escape', () => {
		if(useClapModalOverlayContext.isOpen) useClapModalOverlayContext.stateChangeHandler(false)
	});

	return (
        <>
            <ModalOverlay>
                <motion.div
                    aria-expanded={useClapModalOverlayContext.isOpen}
                    className={`modal-box`}
                    css={ModalBoxCSS({ dark: darkVersion })}
                    initial={{
                        opacity: 0,
                    }}
                    animate={{
                        opacity: useClapModalOverlayContext.isOpen ? 1 : 0,
                        pointerEvents: useClapModalOverlayContext.isOpen ? 'auto' : 'none',
                    }}
                    transition={ModalTransition}
                >
                    <CloseClapModalButton whiteOnBlack={darkVersion} closeAsText={closeAsText} />
                    {useClapModalOverlayContext.isOpen && children}
                </motion.div>
            </ModalOverlay>

            <motion.div
                css={ModalBoxGradientCSS({ dark: darkVersion })}
                onClick={() => useClapModalOverlayContext.stateChangeHandler(false)}
                initial={{ opacity: 0, pointerEvents: 'none' }}
                animate={{
                    opacity: useClapModalOverlayContext.isOpen ? 1 : 0,
                    pointerEvents: useClapModalOverlayContext.isOpen ? 'auto' : 'none',
                }}
                transition={{ duration: 0.25 }}
            >
                {''}
            </motion.div>
        </>
    );
};
