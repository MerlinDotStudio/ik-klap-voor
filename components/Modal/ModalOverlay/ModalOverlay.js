import React, { useState, useContext, useEffect } from 'react';
import { ModalOverlay, ModalBoxCSS, ModalBoxGradientCSS } from './_Components';
import { motion } from 'framer-motion';
import CloseModalButton from './components/CloseModalButton';
import { useRouter } from 'next/router';

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

    return (
        <>
            <ModalOverlay>
                <motion.div
                    aria-expanded={useModalOverlayContext.isOpen}
                    className={`modal-box`}
                    css={ModalBoxCSS({ dark: darkVersion })}
                    initial={{
                        opacity: 0,
                        transform: dark ? 'none' : `scale(0)`,
                    }}
                    animate={{
                        transform: dark ? 'none' : `scale(${useModalOverlayContext.isOpen ? '1' : '0'})`,
                        opacity: useModalOverlayContext.isOpen ? 1 : 0,
                        pointerEvents: useModalOverlayContext.isOpen ? 'auto' : 'none',
                    }}
                    transition={{ duration: dark ? 0.4 : 0.25 }}
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
