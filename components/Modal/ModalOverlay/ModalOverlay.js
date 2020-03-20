import React, { useState, useContext, useEffect } from 'react';
import { ModalOverlay, ModalBoxCSS, ModalBoxGradientCSS } from './_Components';
import { motion } from 'framer-motion';
import CloseModalButton from './components/CloseModalButton';
import { useRouter } from 'next/router';
import { staggerTransition } from '../../../pages';

export const ModalOverlayContext = React.createContext(undefined);

// create the provider
export const ModalOverlayContextProvider = props => {
    const [modalOpenState, setModalOpenState] = useState(true);

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
                },
            }}
        >
            {props.children}
        </ModalOverlayContext.Provider>
    );
};

export default ({ children, dark = false, closeAsText = false }) => {
    const {
        query: { registered },
    } = useRouter();
    const useModalOverlayContext = useContext(ModalOverlayContext);
    const darkVersion = dark;

    useEffect(() => {
        // Only show model if registered query is true
        useModalOverlayContext.stateChangeHandler(registered === 'true');
    }, [registered]);

    const ModalTransition = staggerTransition;
    ModalTransition.duration = 0.5;
    ModalTransition.staggerChildren = 0.25;
    ModalTransition.delayChildren = 0.25;

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
