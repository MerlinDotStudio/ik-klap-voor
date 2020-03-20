import React, { useRef } from 'react';
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
import styled from '@emotion/styled';
import InputStyle from '../components/Inputs/InputStyle';
import firebase from 'firebase';
import Router from 'next/router';

export const InputWithIcon = styled(motion.div)`
    position: relative;
    input {
        padding-left: 3rem;
    }

    > svg,
    > div {
        position: absolute;
        left: 1.05rem;
        top: 50%;
        transform: translateY(-50%);
        width: 1rem;
        max-height: 1rem;
    }
`;

const ApplaudPage = () => {
	const EmailRef = useRef(undefined);
	const NameRef = useRef(undefined);
	const TextRef = useRef(undefined);
	const FormRef = useRef(undefined);
	const db = firebase.firestore();

	return (
		<BlackGradientBackground invert initial="exit" animate="enter" exit="exit" variants={fade}>
			<Header {...defaultHeaderProps} />
			<motion.div initial="exit" animate="enter" exit="exit" variants={textVariants}>
				<main>
					<ContentWrapper variants={textVariants}>
						<BigText variants={textVariants} css={css`text-align: center;`}>
							<div>
								<p>Heb jij een <strong>goed idee</strong> of mis je een <strong>branche/beroep</strong>?</p>
							</div>
						</BigText>
						<form ref={FormRef}>
							<InputWithIcon>
								<div id="Mail">
									<svg className="Path_642" viewBox="0 0 16 12" width={16} height={12}>
										<path
											fill="rgba(112,112,112,1)"
											id="Path_642"
											d="M 14 2 L 2 2 L 8 7 L 14 2 Z M 0 2 C 0 0.8999999761581421 0.8999999761581421 0 2 0 L 14 0 C 15.10000038146973 0 16 0.8999999761581421 16 2 L 16 10 C 16 11.10000038146973 15.10000038146973 12 14 12 L 2 12 C 0.8999999761581421 12 0 11.10000038146973 0 10 L 0 2 Z"
										></path>
									</svg>
								</div>
								<input
									css={InputStyle}
									placeholder={'Email'}
									type={'email'}
									name={'email'}
									required={true}
									autoComplete={'email'}
									ref={EmailRef}
								/>
							</InputWithIcon>
							<InputWithIcon>
								<svg className="profile" viewBox="0 354 16 16" width={16}>
									<path
										fill="#707070"
										id="profile"
										d="M 0 369.9999084472656 L 0 368.0001220703125 C 0 365.7996215820312 3.600000143051147 363.9996032714844 8.000100135803223 363.9996032714844 C 12.40019989013672 363.9996032714844 16.00020027160645 365.7996215820312 16.00020027160645 368.0001220703125 L 16.00020027160645 369.9999084472656 L 0 369.9999084472656 Z M 3.999600172042847 358.0002136230469 C 3.999600172042847 355.7907104492188 5.790600299835205 353.9996948242188 8.000100135803223 353.9996948242188 C 10.20870018005371 353.9996948242188 11.99970054626465 355.7907104492188 11.99970054626465 358.0002136230469 C 11.99970054626465 360.2088012695312 10.20870018005371 361.9998168945312 8.000100135803223 361.9998168945312 C 5.790600299835205 361.9998168945312 3.999600172042847 360.2088012695312 3.999600172042847 358.0002136230469 Z"
									></path>
								</svg>

								<input
									css={InputStyle}
									placeholder={'Uw volledige naam'}
									type={'text'}
									name={'name'}
									required={true}
									autoComplete={'name'}
									ref={NameRef}
								/>
							</InputWithIcon>
							<textarea name="message" id="message" cols="30" rows="10"
									  css={InputStyle}
									  placeholder={'Ik heb een goed idee / Ik vul graag de branches bij met'}
									  required={true}
									  maxLength={280}
									  ref={TextRef}
							/>
						<BottomPosition>
							<ButtonHolder variants={textVariants}>
								<Button key={2} icon={'💌'} type={'submit'} onClick={(e) => {
									e.preventDefault()
									const validForm = FormRef.current.reportValidity();
									if (!validForm) return;
									db.collection('suggesties')
										.add({
											email: EmailRef.current.value,
											name: NameRef.current.value,
											text: TextRef.current.value,
										});
									let isClicked = window.confirm('Bedankt voor je suggestie, we gaan er zo snel mogelijk naar kijken.');
									if(isClicked || !isClicked){
										Router.push('/alle-steun')
									}
								}}
								>
									Stuur een bericht
								</Button>
							</ButtonHolder>
						</BottomPosition>
						</form>

					</ContentWrapper>
				</main>
			</motion.div>
		</BlackGradientBackground>
    );
};

export default ApplaudPage
