import React from 'react';
import App from 'next/app';
import { Global, css } from '@emotion/core';
import { theme } from '../styles/global';
import SEOHead from '../components/SEOHead';
import { AnimatePresence } from 'framer-motion';

import * as firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/analytics';

export const firebaseConfig = {
    apiKey: 'AIzaSyCiOY7rOQASdJB0yLN8InSBsgxPCTBYB2o',
    authDomain: 'ik-klap-voor.firebaseapp.com',
    databaseURL: 'https://ik-klap-voor.firebaseio.com',
    projectId: 'ik-klap-voor',
    storageBucket: 'ik-klap-voor.appspot.com',
    messagingSenderId: '226056764349',
    appId: '1:226056764349:web:14b422ab9b15a2d32cb0d4',
    measurementId: 'G-84C3PTN9YY',
};

// if (window) {
//     firebase.initializeApp(firebaseConfig);
//     firebase.analytics();
// }
// export const db = firebase.firestore();

// MEES FIREBASE SET UP
// let user = firebase.auth().currentUser;
//
// if (!user) {
// 	console.log('fu');
// 	Router.push('/login')
// }
//
// const data = {
// 	age: 24
// }
// console.clear()
// async function checkIfUserDataAndAddOrUpdate(newData, uid){
// 	let userRef = db.collection('users').doc(uid);
// 	const oldData = await userRef.get()
// 		.then(doc => {
// 			if (!doc.exists) {
// 				console.log('No such document!');
// 				return {}
// 			} else {
// 				return doc.data()
// 			}
// 		})
// 		.catch(err => {
// 			console.log('Error getting document', err);
// 		});
// 	console.log(oldData, newData);
// 	const dataForUser = Object.assign(oldData, newData);
// 	console.log(dataForUser);
// 	return await firebase.firestore().collection('users').doc(uid).set(dataForUser)
// }
//
// checkIfUserDataAndAddOrUpdate({saus: 'test', sexPref: 'male', sex: 'female'}, user.uid).then( data => {
// 	console.log('updated', data)
// 	checkIfUserDataAndAddOrUpdate({saus: 'test2', sexPref: 'female'}, user.uid).then( data => {
// 		console.log('updated', data)
// 	})
// })

class MyApp extends App {
    render() {
        const { Component, pageProps, router } = this.props;

        return (
            <>
                <SEOHead />
                <Global
                    styles={css`
                        *,
                        *::before,
                        *::after {
                            box-sizing: border-box;
                            -webkit-text-size-adjust: 100%;
                            -ms-text-size-adjust: 100%;
                            -webkit-font-smoothing: antialiased;
                            -moz-osx-font-smoothing: grayscale;
                            -webkit-tap-highlight-color: transparent;
                            outline: 0;
                        }

                        html {
                            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial,
                                sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
                            box-sizing: border-box;
                        }

                        body {
                            margin: 0;
                            position: relative;
                            width: 100%;
                            height: 100%;
                        }

                        body,
                        #__next,
                        main {
                            min-height: calc(100vh - 4rem - 6vh);
                        }

                        header + * {
                            margin-top: 4rem;
                        }
                    `}
                />
                <AnimatePresence exitBeforeEnter>
                    <Component {...pageProps} key={router.route} />
                </AnimatePresence>
            </>
        );
    }
}

export default MyApp;
