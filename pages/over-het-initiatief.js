import React from 'react';
import Header from '../components/Header/Header';
import { Button } from '../components/Button';
import { css } from '@emotion/core';
import { motion } from 'framer-motion';
import {
	BigText, BlackGradientBackground,
	BottomPosition,
	ButtonHolder,
	ContentWrapper,
	defaultHeaderProps, fade,
	textVariants,
} from './index';

const ApplaudPage = () => {
    return (
		<BlackGradientBackground initial="exit" animate="enter" exit="exit" variants={fade}>
			<Header {...defaultHeaderProps} />
			<motion.div initial="exit" animate="enter" exit="exit" variants={textVariants}>
				<main>
					<ContentWrapper variants={textVariants}>
						<BigText initial="exit" animate="enter" exit="exit" variants={textVariants} css={css`p {font-size: 1.875rem;}`}>
							<div>
								<p>In de <strong>bizarre</strong> tijd van de Corona epidemie is het <strong>lastig</strong> om een steentje bij te dragen, buiten thuis blijven natuurlijk. Wij willen <strong>steun betuigingen</strong> digitaal vereeuwigen, hopende dat iedere held de verdiende waardering voelt!</p>
								<footer>Deze website is opgezet door <br/>
								<a href="https://the-pack.nl"><strong>🐺The Pack</strong></a> en <a href="https://level30wizards.com"><strong>🧙‍️Level30Wizards.</strong></a></footer>
							</div>
						</BigText>
						<BottomPosition>
							<ButtonHolder variants={textVariants}>
								<Button
									icon={'👏'}
									styles={css`
                                        color: #80d0c7;
                                        margin-bottom: 1rem;
                                    `}
									key={1}
									to={'/applaus-voor'}
								>
									Applaudisseer
								</Button>
								<Button key={2} icon={'💌'} to={'/speciaal-bericht'}>
									Stuur een bericht
								</Button>
							</ButtonHolder>
						</BottomPosition>
					</ContentWrapper>
				</main>
			</motion.div>
		</BlackGradientBackground>
    );
};

export default ApplaudPage
