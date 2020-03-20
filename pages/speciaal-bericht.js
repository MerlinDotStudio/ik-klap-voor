import React, { useContext, useState, useRef } from 'react';
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
import InputStyle from '../components/Inputs/InputStyle';
import Select from 'react-select';
import { theme } from '../styles/global';
import Link from 'next/link';
import { ModalOverlayContext } from '../components/Modal/ModalOverlay/ModalOverlay';
import ApplaudModal from '../components/Modal/ApplaudModal';
import { StyledForm } from './applaus-voor';
import firebase from 'firebase';

const SpecialMessage = () => {
    const useModalOverlayContext = useContext(ModalOverlayContext);
    const [textLength, setTextLength] = useState(0);
    const [selectValue, setSelectValue] = useState(useModalOverlayContext.options && useModalOverlayContext.options[0]);
    const TextRef = useRef(undefined);
    const db = firebase.firestore();

    return (
        <BlueGradientBackground invert initial="exit" animate="enter" exit="exit" variants={fade}>
            <Header {...defaultHeaderProps} icon={'💌'} />
            <motion.div initial="exit" animate="enter" exit="exit" variants={textVariants}>
                <main>
                    <ContentWrapper variants={textVariants}>
                        <BigText
                            variants={textVariants}
                            css={css`
                                text-align: center;
                            `}
                        >
                            <div>
                                <p>
                                    Een <strong>speciaal bericht</strong> voor
                                </p>
                            </div>
                        </BigText>
                        <StyledForm>
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
                                        margin: '1rem 0',
                                    }),
                                }}
                                onChange={e =>
                                    setSelectValue({
                                        value: e.value,
                                        label: e.label,
                                    })
                                }
                            />
                            <div
                                css={css`
                                    position: relative;
                                `}
                            >
                                <textarea
                                    name="message"
                                    id="message"
                                    cols="30"
                                    rows="10"
                                    css={InputStyle}
                                    placeholder={'Deel hier jouw dank en persoonlijke bericht…'}
                                    required={true}
                                    maxLength={280}
                                    onInput={e => {
                                        setTextLength(e.target.value.length);
                                    }}
                                    ref={TextRef}
                                />
                                <span
                                    css={css`
                                        position: absolute;
                                        bottom: 1.45rem;
                                        right: 0.25rem;
                                        font-size: 0.825rem;
                                        color: ${textLength < 8 ? theme.colors.statusRed : '#333'};
                                    `}
                                >
                                    {textLength} / 280
                                </span>
                            </div>
                            <BottomPosition>
                                <ButtonHolder variants={textVariants}>
                                    {/*Message should be sent to Firebase*/}
                                    <Button
                                        key={2}
                                        icon={'💌'}
                                        ariaDisabled={textLength < 8}
                                        onClick={() => {
                                            if (textLength < 8) return;
                                            db.collection('berichten')
                                                .doc(selectValue.value)
                                                .collection('messages')
                                                .add({
                                                    messages: {
                                                        bericht: TextRef.current.value,
                                                        date: Date.now(),
                                                    },
                                                });
                                            useModalOverlayContext.stateChangeHandler(true);
                                        }}
                                    >
                                        Plaats jouw bericht
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
                </main>
            </motion.div>
            <ApplaudModal />
        </BlueGradientBackground>
    );
};

export default SpecialMessage;
