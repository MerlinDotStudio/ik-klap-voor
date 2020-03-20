import React, { useState, useContext } from 'react';
import Header from '../components/Header/Header';
import { Button } from '../components/Button';
import {
    BlueGradientBackground,
    ContentWrapper,
    BigText,
    fade,
    defaultHeaderProps,
    textVariants,
    BottomPosition,
    ButtonHolder,
} from './index';
import {
    ClapModalOverlayContext,
    ClapModalOverlayContextProvider,
} from '../components/Modal/ModalOverlay/ClapModalOverlay';
import Modal, { ModalOverlayContext, ModalOverlayContextProvider } from '../components/Modal/ModalOverlay/ModalOverlay';
import ApplaudModal from '../components/Modal/ApplaudModal';
import ClapModal from '../components/Modal/ClapModal';
import { motion } from 'framer-motion';
import { css } from '@emotion/core';
import styled from '@emotion/styled';

const Select = styled.select`
    width: 100%;
    font-size: 2rem;
    background: transparent;
    border: none;
    border-bottom: 1px dotted white;
    color: white;
`;

const SelectOption = styled.option`
    color: black;
`;

const ApplaudisseerPage = () => {
    const [applause, setApplause] = useState('');

    function selectionChange(e) {
        setApplause(e.target.value);
    }
    return (
        <BlueGradientBackground initial="exit" animate="enter" exit="exit" variants={fade}>
            <Header {...defaultHeaderProps} />
            <ClapModalOverlayContextProvider>
                <motion.div initial="exit" animate="enter" exit="exit" variants={textVariants}>
                    <main>
                        <ContentWrapper variants={textVariants}>
                            <BigText variants={textVariants}>
                                <div>
                                    <p
                                        css={css`
                                            text-align: center;
                                        `}
                                    >
                                        Een groot <strong>applause</strong> voor
                                    </p>
                                </div>
                                <Select name="applauseVoor" onChange={selectionChange}>
                                    <SelectOption value="">Selecteer een optie</SelectOption>
                                    <SelectOption value="artsen">De artsen</SelectOption>
                                    <SelectOption value="brandweer">De brandweer</SelectOption>
                                    <SelectOption value="politie">De politie</SelectOption>
                                </Select>
                            </BigText>
                            <ActionButton applause={applause} />
                        </ContentWrapper>
                    </main>
                </motion.div>
                <ClapModal />
            </ClapModalOverlayContextProvider>
        </BlueGradientBackground>
    );
};

const ActionButton = ({ applause }) => {
    const useClapModalOverlayContext = useContext(ClapModalOverlayContext);

    return (
        <BottomPosition
            css={css`
                width: 100%;
            `}
        >
            <ButtonHolder
                variants={textVariants}
                css={css`
                    width: 100%;
                    max-width: 30rem;
                `}
            >
                <Button
                    icon={'👏'}
                    styles={css`
                        color: #80d0c7;
                        margin-bottom: 1rem;
                        opacity: ${applause.length ? 1 : 0.3};
                        pointer-events: ${applause.length ? 'all' : 'none'};
                        transition: opacity 0.3s ease;
                    `}
                    key={1}
                    onClick={() => useClapModalOverlayContext.stateChangeHandler(true)}
                >
                    Applaudisseer
                </Button>
            </ButtonHolder>
        </BottomPosition>
    );
};

export default ApplaudisseerPage;
