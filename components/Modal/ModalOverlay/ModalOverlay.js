import React, { useState, useContext, useEffect } from 'react';
import { ModalOverlay, ModalBoxCSS, ModalBoxGradientCSS } from './_Components';
import { motion } from 'framer-motion';
import CloseModalButton from './components/CloseModalButton';
import Router from 'next/router'
import { getTotalApplaus, staggerTransition } from '../../../pages';
import useKeyPress from '../../../utils/useKeypress';
import firebase from 'firebase';

export const ModalOverlayContext = React.createContext(undefined);

// create the provider
export const ModalOverlayContextProvider = props => {
    const [modalOpenState, setModalOpenState] = useState(false);
    const [applausAmount, setApplausAmount] = useState(0);
	const [options, setOptions] = useState(undefined)
	const [messages, setMessages] = useState(0)
	const [clapData, setClapData] = useState(undefined);

	useEffect( () => {
		const db = firebase.firestore()
		const applauseData = db.collection('applaus').get()
		applauseData.then( snapshot => {
			const values = []
			const optionArray = []
			const fullClapData = [];

			snapshot.forEach((doc) => {
				const docData = doc.data()
				const obj = {
					value: doc.id,
					label: docData.name
				}
				optionArray.push(obj);
				values.push(docData.number)
				fullClapData.push(docData);
			});

			// const iedereen = db.collection('applaus').doc('iedereen')
			const sortedClapData = fullClapData.sort((a, b)=>b.number - a.number)
			const reducer = (accumulator, currentValue) => accumulator + currentValue;
			setApplausAmount(values.reduce(reducer))
			setOptions(optionArray)
			setClapData(sortedClapData);
		})

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
								message: message.bericht,
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
		}, [modalOpenState, applausAmount] )


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
					if(newState === true) {
						const audio = new Audio('/sounds/message.mp3');
						audio.play();
					}
					if(newState === false) Router.push('/alle-steun')
				},
				updateApplausAmount: newState => {
					setApplausAmount(newState);
				},
				applausAmount: applausAmount,
				options: options,
				messageAmount: messages.length,
				clapData: clapData
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
