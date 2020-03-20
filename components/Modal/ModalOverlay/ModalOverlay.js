import React, { useState, useContext, useEffect } from 'react';
import { ModalOverlay, ModalBoxCSS, ModalBoxGradientCSS } from './_Components';
import { motion } from 'framer-motion';
import CloseModalButton from './components/CloseModalButton';
import Router from 'next/router'
import { staggerTransition } from '../../../pages';
import useKeyPress from '../../../utils/useKeypress';

export const ModalOverlayContext = React.createContext(undefined);

// create the provider
export const ModalOverlayContextProvider = props => {
    const [modalOpenState, setModalOpenState] = useState(false);

    return (
        <ModalOverlayContext.Provider
            value={{
                isOpen: modalOpenState,
                toggleModal: () => {
                    setModalOpenState(!modalOpenState);
                    document.body.classList.toggle('has-overlay');
                },
                stateChangeHandler: newState => {
                    setModalOpenState(newState);
                    document.body.classList.toggle('has-overlay');
					if(newState === false) Router.push('/alle-steun')
				},
            }}
        >
            {props.children}
        </ModalOverlayContext.Provider>
    );
};

export default ({ children, dark = false, closeAsText = false }) => {
    const useModalOverlayContext = useContext(ModalOverlayContext);
    const darkVersion = dark;

	const ModalTransition = staggerTransition
	ModalTransition.duration = .5
	ModalTransition.staggerChildren = .25
	ModalTransition.delayChildren = .25

	useKeyPress('Escape', () => {
		if(useModalOverlayContext.isOpen) useModalOverlayContext.stateChangeHandler(false)
		Router.push('/alle-steun')
	});

	return (
        <>
            <ModalOverlay>
                <motion.div
                    aria-expanded={useModalOverlayContext.isOpen}
                    className={`modal-box`}
                    css={ModalBoxCSS({ dark: darkVersion })}
                    initial={{
                        opacity: 0,
                    }}
                    animate={{
                        opacity: useModalOverlayContext.isOpen ? 1 : 0,
                        pointerEvents: useModalOverlayContext.isOpen ? 'auto' : 'none',
                    }}
                    transition={ModalTransition}
                >
                    <CloseModalButton whiteOnBlack={darkVersion} closeAsText={closeAsText} />
                    {useModalOverlayContext.isOpen && children}
                </motion.div>
            </ModalOverlay>

            <motion.div
                css={ModalBoxGradientCSS({ dark: darkVersion })}
                onClick={() => useModalOverlayContext.stateChangeHandler(false)}
                initial={{ opacity: 0, pointerEvents: 'none' }}
                animate={{
                    opacity: useModalOverlayContext.isOpen ? 1 : 0,
                    pointerEvents: useModalOverlayContext.isOpen ? 'auto' : 'none',
                }}
                transition={{ duration: 0.25 }}
            >
                {''}
            </motion.div>
        </>
    );
};
