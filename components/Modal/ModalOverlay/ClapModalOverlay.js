import React, { useState, useContext } from 'react';
import { ModalOverlay, ModalBoxCSS, ModalBoxGradientCSS } from './_Components';
import { motion } from 'framer-motion';
import { staggerTransition } from '../../../pages';
import CloseClapModalButton from './components/CloseClapModalButton';

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
                    transition={staggerTransition}
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
