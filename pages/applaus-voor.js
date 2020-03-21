import React, { useContext, useState, useEffect, useRef } from 'react';
import Header from '../components/Header/Header';
import { Button } from '../components/Button';
import { css } from '@emotion/core';
import { motion } from 'framer-motion';
import {
	BigText,
	BlueGradientBackground,
	BottomPosition,
	ButtonHolder,
	ContentWrapper,
	defaultHeaderProps,
	fade, HasNotification,
	incrementCertainApplaus,
	textVariants,
} from './index';
import Select from 'react-select';
import { mq, theme } from '../styles/global';
import Link from 'next/link';
import { ClapModalOverlayContext } from '../components/Modal/ModalOverlay/ClapModalOverlay';
import ClapModal from '../components/Modal/ClapModal';
import styled from '@emotion/styled';
import { ModalOverlayContext } from '../components/Modal/ModalOverlay/ModalOverlay';

export const StyledForm = styled(motion.form)`
    max-width: 30rem;
`;

const Messages = styled(motion.ul)`
    padding: 0 7.5% 5%;
    margin: 3rem auto 0;

    li {
        list-style-type: none;
        padding: 1rem;
        background-color: white;
        border-radius: 4px;
        box-shadow: 0 -2px 10px 0 rgba(0, 0, 0, 0.16);
        margin-bottom: 1rem;
        display: flex;
        flex-flow: column wrap;
        align-items: center;
        justify-content: center;

        .title {
        	text-align: center;
            font-size: 0.875rem;
            color: #13547A;
            margin: 0;

            strong {
                color: black;
                margin-right: 0.5rem;
            }
        }
        .text {
            font-size: 1.125rem;
            font-weight: bold;
        }

    }

    @media ${mq.min.small} {
        display: grid;
        grid-gap: 1rem;
        grid-template-columns: 1fr 1fr;

		li {
            margin-bottom: 0;
        }
	}
    @media ${mq.min.medium} {
        grid-template-columns: 1fr 1fr 1fr;
        width: 100vw;
    }
`;

const SpecialMessage = () => {
    const useClapModalOverlayContext = useContext(ClapModalOverlayContext);
    const useModalOverlayContext = useContext(ModalOverlayContext);
    const [selectValue, setSelectValue] = useState(
        useModalOverlayContext.options && useModalOverlayContext.options[0] && useModalOverlayContext.options[0].value,
    );
    return (
        <BlueGradientBackground invert initial="exit" animate="enter" exit="exit" variants={fade}>
            <Header {...defaultHeaderProps} icon={'👏'} hasAmount={true} amount={useModalOverlayContext.applausAmount}/>
            <motion.div initial="exit" animate="enter" exit="exit" variants={textVariants}>
                <main>
                    <ContentWrapper
                        variants={textVariants}
                        css={css`
                            align-content: flex-start;
                            min-height: unset;
                        `}
                    >
                        <BigText
                            variants={textVariants}
                            css={css`
                                text-align: center;
                            `}
                        >
                            <div>
                                <p>
                                    Een <strong>groot applaus</strong> voor
                                </p>
                            </div>
                        </BigText>
                        <StyledForm variants={textVariants}>
                            <Select
                                defaultValue={useModalOverlayContext.options && useModalOverlayContext.options[0]}
                                options={useModalOverlayContext.options}
                                isClearable={false}
                                placeholder={'🌍 Iedereen'}
                                styles={{
                                    placeholder: base => ({
                                        ...base,
                                        fontSize: '1.125rem',
                                        color: '#707070',
                                        fontWeight: 400,
                                        paddingLeft: '.35rem',
                                    }),
                                    indicatorSeparator: () => ({
                                        display: 'none',
                                    }),
                                    dropdownIndicator: base => ({
                                        ...base,
                                        color: theme.colors.grey,
                                    }),
                                    control: base => ({
                                        ...base,
                                        height: '3.4375rem',
                                        boxShadow: 'inset 0 1px 3px 0 rgba(15,31,44,0.1)',
                                        borderRadius: '8px',
                                        border: `1px solid ${theme.colors.white}`,
                                        margin: '.5rem 0 2.375rem',
                                    }),
                                }}
                                onChange={e => setSelectValue(e.value)}
                            />
							<BottomPosition>
								<ButtonHolder variants={textVariants}>
									{/*Message should be sent to Firebase*/}
									<Button
										key={2}
										icon={'👏'}
										onClick={() => {
											useClapModalOverlayContext.stateChangeHandler(true);
											incrementCertainApplaus(selectValue);
										}}
									>
										Applaudisseer
									</Button>
								</ButtonHolder>
								<ButtonHolder variants={textVariants}>
									<Link href={'/suggestie'}>
										<a className={'normal-link'}>Oeps, ik mis een branche!</a>
									</Link>
								</ButtonHolder>
							</BottomPosition>
                        </StyledForm>
                    </ContentWrapper>
					<Messages variants={textVariants}>
						{useModalOverlayContext.clapData ? useModalOverlayContext.clapData.map((data, i) => (
							<li key={i}>
								<h2 className={'title'}>{data.name}</h2>
								<data className={'text'} value={data.number}>{data.number}</data>
							</li>
						)) : null}
					</Messages>
                </main>
            </motion.div>
            <ClapModal />
        </BlueGradientBackground>
    );
};

export default SpecialMessage;
