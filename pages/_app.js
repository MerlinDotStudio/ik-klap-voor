import React from 'react';
import App from 'next/app';
import { Global, css } from '@emotion/core';
import { theme } from '../styles/global';
import SEOHead from '../components/SEOHead';

class MyApp extends App {
    render() {
        const { Component, pageProps } = this.props;

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
                            min-height: calc(100vh - 4rem);
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
                            background: #80d0c7;
                            border: 0 none #ffffff;
                            border-radius: 0;
                            transition: all 300ms ease-in-out;
                        }
                        ::-webkit-scrollbar-thumb:hover {
                            background: #13547a;
                        }
                        ::-webkit-scrollbar-thumb:active {
                            background: #13547a;
                        }
                        ::-webkit-scrollbar-track {
                            background: #13547a;
                            border-radius: 0;
                            transition: all 300ms ease-in-out;
                        }
                        ::-webkit-scrollbar-track:hover {
                            background: #80d0c7;
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

export default MyApp;
