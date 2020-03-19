import React from 'react';
import { mq, theme } from '../../styles/global';
import Link from 'next/link';
import styled from '@emotion/styled';
import {
    HeaderHamburgerMenu,
} from './_Components';

const Header = props => {
    const {
        t,
    } = props;

    const Header = styled.header`
        border-radius: 0 0 .5rem .5rem;
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        z-index: 9;

        li {
            list-style-type: none;
        }

        .logo {
            height: 2rem;
            position: absolute;
            left: 0;
            bottom: 50%;
            transform: translateY(50%);
        }
        @media ${mq.max.medium} {
            .logo {
                height: 1.25rem;
            }
            h1 {
                font-size: 1.2rem;
            }
        }
    `;

    const LogoTitle = styled.h1`
        color: transparent;
        position: relative;
        margin: 0;
        font-size: 1.85rem;

        @media ${mq.max.medium} {
            font-size: 1.2rem;
        }
    `;

    const Nav = styled.nav`
        height: 4rem;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding: 0 1rem;

        a {
            text-decoration: none;
        }

        .header-holder {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            > div {
                margin-left: 0.75rem;
                position: relative;
                height: 100%;
                display: flex;
                align-items: center;

            }
        }
    `;

    return (
        <Header>
            <Nav>
                <div>

                </div>
                <div className={'header-holder'}>
					<HeaderHamburgerMenu t={t} />
                </div>
            </Nav>
        </Header>
    );
};

export default Header
