import React from 'react';
import App from 'next/app';
import { Global, css } from '@emotion/core';
import { theme } from '../styles/global';
import SEOHead from '../components/SEOHead';
import { appWithTranslation } from '../i18n';

class MyApp extends App {
    render() {
        const { Component, pageProps } = this.props;

        return (
                <>
                    <SEOHead />
                    <Global
                        styles={
                            css`
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
                                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
                                        Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
                                        'Segoe UI Symbol';
                                        box-sizing: border-box;
                                }

                                body {
                                    margin: 0;
                                    position: relative;
                                    width: 100%;
                                    height: 100%;
                                }

                                header + * {
                                	margin-top: 4rem;
                                }

                                ::-webkit-scrollbar {
                                    width: 8px;
                                    height: 8px;
                                    transition: all 300ms ease-in-out;
                                }
                                ::-webkit-scrollbar-button {
                                    width: 0;
                                    height: 0;
                                    transition: all 300ms ease-in-out;
                                }
                                ::-webkit-scrollbar-thumb {
                                    background: rgb(215, 18, 33);
                                    border: 0 none #ffffff;
                                    border-radius: 0;
                                    transition: all 300ms ease-in-out;
                                }
                                ::-webkit-scrollbar-thumb:hover {
                                    background: #8a0b16;
                                }
                                ::-webkit-scrollbar-thumb:active {
                                    background: #000000;
                                }
                                ::-webkit-scrollbar-track {
                                    background: #cbcbcb;
                                    border-radius: 0;
                                    transition: all 300ms ease-in-out;
                                }
                                ::-webkit-scrollbar-track:hover {
                                    background: #666666;
                                }
                                ::-webkit-scrollbar-track:active {
                                    background: #333333;
                                }
                                ::-webkit-scrollbar-corner {
                                    background: transparent;
                                    transition: all 300ms ease-in-out;
                                }
                            `}
                    />
                            <Component {...pageProps} />
                </>
        );
    }
}

export default appWithTranslation(MyApp);
