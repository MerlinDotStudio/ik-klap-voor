import React from 'react';
import { css } from '@emotion/core';
import { theme } from '../../styles/global';

function Heart(props) {
    const { color, extraStyle, animationClassName } = props;

    const style = css`
		cursor: pointer;
		overflow: visible;
		width: 2.25rem;
        height: 2.25rem;
        pointer-events: none;
        transition: all 250ms ease-out;

		.heart {
			transform-origin: center;
			animation: animateHeartOut 0.3s linear forwards;
			fill: ${theme.colors.burpleUi};
		}
		.main-circ {
			transform-origin: 29.5px 29.5px;
		}

        &.clicked {
            .heart {
                transform: scale(0.6);
				fill: ${theme.colors.primary};
                animation: animateHeart 0.3s linear forwards 0.25s;
            }
            .main-circ {
                transition: all 2s;
                animation: animateCircle 0.4s linear forwards;
                opacity: .5;
            }
            .grp1 {
                opacity: 1;
                transition: 0.1s all 0.3s;
                .oval1 {
                    transform: scale(0) translate(0, -30px);
                    transform-origin: 0 0 0;
                    transition: 0.5s transform 0.3s;
                }
                .oval2 {
                    transform: scale(0) translate(10px, -50px);
                    transform-origin: 0 0 0;
                    transition: 1.5s transform 0.3s;
                }
            }
            .grp2 {
                opacity: 1;
                transition: 0.1s all 0.3s;
                .oval1 {
                    transform: scale(0) translate(30px, -15px);
                    transform-origin: 0 0 0;
                    transition: 0.5s transform 0.3s;
                }
                .oval2 {
                    transform: scale(0) translate(60px, -15px);
                    transform-origin: 0 0 0;
                    transition: 1.5s transform 0.3s;
                }
            }
            .grp3 {
                opacity: 1;
                transition: 0.1s all 0.3s;
                .oval1 {
                    transform: scale(0) translate(30px, 0px);
                    transform-origin: 0 0 0;
                    transition: 0.5s transform 0.3s;
                }
                .oval2 {
                    transform: scale(0) translate(60px, 10px);
                    transform-origin: 0 0 0;
                    transition: 1.5s transform 0.3s;
                }
            }
            .grp4 {
                opacity: 1;
                transition: 0.1s all 0.3s;
                .oval1 {
                    transform: scale(0) translate(30px, 15px);
                    transform-origin: 0 0 0;
                    transition: 0.5s transform 0.3s;
                }
                .oval2 {
                    transform: scale(0) translate(40px, 50px);
                    transform-origin: 0 0 0;
                    transition: 1.5s transform 0.3s;
                }
            }
            .grp5 {
                opacity: 1;
                transition: 0.1s all 0.3s;
                .oval1 {
                    transform: scale(0) translate(-10px, 20px);
                    transform-origin: 0 0 0;
                    transition: 0.5s transform 0.3s;
                }
                .oval2 {
                    transform: scale(0) translate(-60px, 30px);
                    transform-origin: 0 0 0;
                    transition: 1.5s transform 0.3s;
                }
            }
            .grp6 {
                opacity: 1;
                transition: 0.1s all 0.3s;
                .oval1 {
                    transform: scale(0) translate(-30px, 0px);
                    transform-origin: 0 0 0;
                    transition: 0.5s transform 0.3s;
                }
                .oval2 {
                    transform: scale(0) translate(-60px, -5px);
                    transform-origin: 0 0 0;
                    transition: 1.5s transform 0.3s;
                }
            }
            .grp7 {
                opacity: 1;
                transition: 0.1s all 0.3s;
                .oval1 {
                    transform: scale(0) translate(-30px, -15px);
                    transform-origin: 0 0 0;
                    transition: 0.5s transform 0.3s;
                }
                .oval2 {
                    transform: scale(0) translate(-55px, -30px);
                    transform-origin: 0 0 0;
                    transition: 1.5s transform 0.3s;
                }
            }
            .grp2 {
                opacity: 1;
                transition: 0.1s opacity 0.3s;
            }
            .grp3 {
                opacity: 1;
                transition: 0.1s opacity 0.3s;
            }
            .grp4 {
                opacity: 1;
                transition: 0.1s opacity 0.3s;
            }
            .grp5 {
                opacity: 1;
                transition: 0.1s opacity 0.3s;
            }
            .grp6 {
                opacity: 1;
                transition: 0.1s opacity 0.3s;
            }
            .grp7 {
                opacity: 1;
                transition: 0.1s opacity 0.3s;
            }
        }

        @keyframes animateCircle {
            40% {
                transform: scale(100);
                opacity: .5;
                fill: #ffbedb;
            }
            55% {
                transform: scale(150);
                opacity: .5;
                fill: #ffbedb;
            }
            65% {
                transform: scale(200);
                opacity: .5;
                fill: #ff82a0;
            }
            75% {
                transform: scale(260);
                opacity: .5;
                fill: transparent;
                stroke: #ff82a0;
                stroke-width: 0.5;
            }
            85% {
                transform: scale(290);
                opacity: .5;
                fill: transparent;
                stroke: ${theme.colors.primary};
                stroke-width: 0.2;
            }
            95% {
                transform: scale(320);
                opacity: .5;
                fill: transparent;
                stroke: ${theme.colors.primary};
                stroke-width: 0.1;
            }
            100% {
                transform: scale(350);
                opacity: .5;
                fill: transparent;
                stroke: ${theme.colors.primary};
                stroke-width: 0;
            }
        }

        @keyframes animateHeart {
            0% {
                transform: scale(0.6);
            }
            40% {
                transform: scale(1.6);
            }
            100% {
                transform: scale(1);
            }
        }

        @keyframes animateHeartOut {
            0% {
                transform: scale(1.4);
            }
            100% {
                transform: scale(1);
            }
        }
    `;

    return (
        <svg
            className={"heart-svg " + animationClassName}
			css={style}
            viewBox="467 392 58 57"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g fill="none" fillRule="evenodd" transform="translate(467 392)">
                <path
                    d="M29.144 20.773c-.063-.13-4.227-8.67-11.44-2.59C7.63 28.795 28.94 43.256 29.143 43.394c.204-.138 21.513-14.6 11.44-25.213-7.214-6.08-11.377 2.46-11.44 2.59z"
                    className="heart"
                    fill="#AAB8C2"
                />
                <circle
                    className="main-circ"
                    fill="#E2264D"
                    opacity="0"
                    cx="29.5"
                    cy="29.5"
                    r="1.5"
                />

                <g className="grp7" opacity="0" transform="translate(7 6)">
                    <circle className="oval1" fill="#9CD8C3" cx="2" cy="6" r="2" />
                    <circle className="oval2" fill="#8CE8C3" cx="5" cy="2" r="2" />
                </g>

                <g className="grp6" opacity="0" transform="translate(0 28)">
                    <circle className="oval1" fill="#CC8EF5" cx="2" cy="7" r="2" />
                    <circle className="oval2" fill="#91D2FA" cx="3" cy="2" r="2" />
                </g>

                <g className="grp3" opacity="0" transform="translate(52 28)">
                    <circle className="oval2" fill="#9CD8C3" cx="2" cy="7" r="2" />
                    <circle className="oval1" fill="#8CE8C3" cx="4" cy="2" r="2" />
                </g>

                <g className="grp2" opacity="0" transform="translate(44 6)">
                    <circle className="oval2" fill="#CC8EF5" cx="5" cy="6" r="2" />
                    <circle className="oval1" fill="#CC8EF5" cx="2" cy="2" r="2" />
                </g>

                <g className="grp5" opacity="0" transform="translate(14 50)">
                    <circle className="oval1" fill="#91D2FA" cx="6" cy="5" r="2" />
                    <circle className="oval2" fill="#91D2FA" cx="2" cy="2" r="2" />
                </g>

                <g className="grp4" opacity="0" transform="translate(35 50)">
                    <circle className="oval1" fill="#F48EA7" cx="6" cy="5" r="2" />
                    <circle className="oval2" fill="#F48EA7" cx="2" cy="2" r="2" />
                </g>

                <g className="grp1" opacity="0" transform="translate(24)">
                    <circle className="oval1" fill="#9FC7FA" cx="2.5" cy="3" r="2" />
                    <circle className="oval2" fill="#9FC7FA" cx="7.5" cy="2" r="2" />
                </g>
            </g>
        </svg>
    );
}

export default Heart;
