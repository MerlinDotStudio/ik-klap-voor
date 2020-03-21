import { css } from '@emotion/core';
import { motion } from 'framer-motion';
import {
    FacebookIcon,
    FacebookShareButton,
    LinkedinIcon,
    LinkedinShareButton,
    TwitterIcon,
    TwitterShareButton,
    WhatsappIcon,
    WhatsappShareButton,
} from 'react-share';
import Modal from './ModalOverlay/ModalOverlay';
import React from 'react';
import { BigText, ContentWrapper, textVariants } from '../../pages';

const ApplaudModal = () => (
    <Modal>
        <ContentWrapper
            variants={textVariants}
            css={css`
                justify-content: center;
                align-items: center;
                flex-flow: column wrap;
                align-content: center;
                text-align: center;
                div {
                    color: #FFF;
                }
            `}
        >
            <BigText variants={textVariants}>Dank voor je applaus!</BigText>
            <BigText
                variants={textVariants}
                css={css`
                    font-size: 5.25rem;
                `}
            >
                💌 +1
            </BigText>
            <BigText variants={textVariants}>Deel jouw steun met de (sociale) wereld!</BigText>
            <motion.ul
                variants={textVariants}
                css={css`
                    display: flex;
                    justify-content: center;
                    padding: 0;
                    margin: 0;
                    li {
                        list-style-type: none;
                        margin: 0.5rem;
                    }
                `}
            >
                <li>
                    <FacebookShareButton
                        url={'https://ikklapvoor.nl'}
                        hashtag={'covid19, corona, nederland'}
                        quote={
                            'Laten we iedereen die momenteel vecht voor anderen een hart onder de riem steken. Ik heb geklapt voor mijn helden die vechten tegen corona, jij ook?'
                        }
                    >
                        <FacebookIcon size={32} round={true} />
                    </FacebookShareButton>
                </li>
                <li>
                    <LinkedinShareButton
                        url={'https://ikklapvoor.nl'}
                        title={'ik klap voor...'}
                        summary={
                            'Laten we iedereen die momenteel vecht voor anderen een hart onder de riem steken. Ik heb geklapt voor mijn helden die vechten tegen corona, jij ook?'
                        }
                    >
                        <LinkedinIcon size={32} round={true} />
                    </LinkedinShareButton>
                </li>
                <li>
                    <TwitterShareButton
                        url={'https://ikklapvoor.nl'}
                        title={
                            'Laten we iedereen die momenteel vecht voor anderen een hart onder de riem steken. Ik heb geklapt voor mijn helden die vechten tegen corona, jij ook?'
                        }
                    >
                        <TwitterIcon size={32} round={true} />
                    </TwitterShareButton>
                </li>
                <li>
                    <WhatsappShareButton
                        url={'https://ikklapvoor.nl'}
                        title={
                            'Laten we iedereen die momenteel vecht voor anderen een hart onder de riem steken. Ik heb geklapt voor mijn helden die vechten tegen corona, jij ook?'
                        }
                    >
                        <WhatsappIcon size={32} round={true} />
                    </WhatsappShareButton>
                </li>
            </motion.ul>
        </ContentWrapper>
    </Modal>
);

export default ApplaudModal;
