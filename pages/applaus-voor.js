import React, { useContext, useEffect, useState } from 'react';
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
    fade,
    textVariants,
} from './index';
import Select from 'react-select';
import { theme } from '../styles/global';
import Link from 'next/link';
import { ClapModalOverlayContext } from '../components/Modal/ModalOverlay/ClapModalOverlay';
import { options } from './speciaal-bericht';
import ClapModal from '../components/Modal/ClapModal';
import styled from '@emotion/styled';

export const StyledForm = styled(motion.form)`
	max-width: 30rem;
`

const SpecialMessage = () => {
    const useClapModalOverlayContext = useContext(ClapModalOverlayContext);
    return (
        <BlueGradientBackground invert initial="exit" animate="enter" exit="exit" variants={fade}>
            <Header {...defaultHeaderProps} icon={'💌'} />
            <motion.div initial="exit" animate="enter" exit="exit" variants={textVariants}>
                <main>
                    <ContentWrapper variants={textVariants} css={css`    align-content: space-between;`}>
                        <BigText variants={textVariants} css={css`text-align: center;`}>
                            <div>
                                <p>
                                    Een <strong>groot applaus</strong> voor
                                </p>
                            </div>
                        </BigText>
                        <StyledForm>
                            <Select
								defaultValue={options[0]}
                                options={options}
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
                                        margin: '1rem 0 40vh',
                                    }),
                                }}
                            />
                            <BottomPosition>
                                <ButtonHolder variants={textVariants}>
                                    {/*Message should be sent to Firebase*/}
                                    <Button key={2} icon={'👏'} onClick={() =>  useClapModalOverlayContext.stateChangeHandler(true)}>
                                        Applaudisseer
                                    </Button>
                                </ButtonHolder>
                                <ButtonHolder variants={textVariants}>
                                    <Link href={'/suggestie'}>
                                        <a>Oeps, ik mis een branche!</a>
                                    </Link>
                                </ButtonHolder>
                            </BottomPosition>
                        </StyledForm>
                    </ContentWrapper>
                </main>
            </motion.div>
            <ClapModal />
        </BlueGradientBackground>
    );
};

export default SpecialMessage;
