import React from 'react';
import App from 'next/app';
import { Global, css } from '@emotion/core';
import { theme } from '../styles/global';
import SEOHead from '../components/SEOHead';
import { AnimatePresence } from 'framer-motion';
import { ModalOverlayContextProvider } from '../components/Modal/ModalOverlay/ModalOverlay';
import { ClapModalOverlayContextProvider } from '../components/Modal/ModalOverlay/ClapModalOverlay';
import { BlueGradientBackground } from './index';

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
                            min-height: calc(100vh - 4rem + 1px);
                        }

                        header + * {
                            margin-top: 4rem;
                        }
                    `}
                />
                <ModalOverlayContextProvider>
                    <ClapModalOverlayContextProvider>
                        <AnimatePresence exitBeforeEnter>
                            <Component {...pageProps} key={router.route} />
                        </AnimatePresence>
                    </ClapModalOverlayContextProvider>
                </ModalOverlayContextProvider>
            </>
        );
    }
}

export default MyApp;
