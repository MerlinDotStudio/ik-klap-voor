import React, {useState} from 'react';
import styled from '@emotion/styled';
import { withTranslation } from '../i18n';
import Header from '../components/Header/Header';
import FadeIn from '../utils/FadeIn';
import { theme } from '../styles/global';

// MEES FIREBASE SET UP
// const db = firebase.firestore()
// let user = firebase.auth().currentUser;
//
// if (!user) {
// 	console.log('fu');
// 	Router.push('/login')
// }
//
// const data = {
// 	age: 24
// }
// console.clear()
// async function checkIfUserDataAndAddOrUpdate(newData, uid){
// 	let userRef = db.collection('users').doc(uid);
// 	const oldData = await userRef.get()
// 		.then(doc => {
// 			if (!doc.exists) {
// 				console.log('No such document!');
// 				return {}
// 			} else {
// 				return doc.data()
// 			}
// 		})
// 		.catch(err => {
// 			console.log('Error getting document', err);
// 		});
// 	console.log(oldData, newData);
// 	const dataForUser = Object.assign(oldData, newData);
// 	console.log(dataForUser);
// 	return await firebase.firestore().collection('users').doc(uid).set(dataForUser)
// }
//
// checkIfUserDataAndAddOrUpdate({saus: 'test', sexPref: 'male', sex: 'female'}, user.uid).then( data => {
// 	console.log('updated', data)
// 	checkIfUserDataAndAddOrUpdate({saus: 'test2', sexPref: 'female'}, user.uid).then( data => {
// 		console.log('updated', data)
// 	})
// })


const ContainerForm = styled.form`
    width: 2.75rem;
    height: 2.75rem;
    position: absolute;
    right: 0.5rem;
    top: 65%;
    z-index: 2;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: transform 200ms ease-out;
    cursor: pointer;
    transform-origin: center;

    &:hover {
        .heart-svg {
            fill: ${theme.colors.primary};
            transform: scale(1.1);
        }
    }

    button {
        width: 2.75rem;
        height: 2.75rem;
        border: 0;
        background: none;
        padding: 0;
        position: absolute;
        top: 0;
        left: 0;
        outline: none;
        cursor: pointer;

        &:active {
            + .icon .heart-svg {
                transform: scale(0.6);
            }
        }
    }
`;

export const FabLike = props => {
	const { id, checked, defaultValue, disabled, name, label, styles } = props;
	const [clicked, setClicked] = useState(false);

	const handleOnChange = event => {
		const { onChange } = this.props;
		const newChecked = event.target.checked;

		if (onChange) {
			onChange(newChecked);
		}
	};

	function animateHeart(e) {
		e.preventDefault();
		setClicked(!clicked);
	}

	return (
		<ContainerForm action="" onSubmit={e => animateHeart(e)} css={styles ? styles : undefined}>
			<input type="hidden" value={id} name={'id'} />
			<button type={'submit'} aria-label={'Like'}><span style={{position: 'absolute', opacity: '0', pointerEvents: 'none'}}>Like</span></button>
			<div className={'icon'}>
				{/*<Heart animationClassName={clicked ? 'clicked' : null} />*/}
				icon hier
			</div>
			{label}
		</ContainerForm>
	);
};


const BlueGradientBackground = styled.div`
	background-image: linear-gradient(0deg, ${theme.colors.darkBlue} 0%, ${theme.colors.lightBlue} 100%);
	position: fixed;
	z-index: -1;
	width: 100vw;
	height: 100vh;
	left: 0;
	top: 0;
	pointer-events: none;
`
const BlackGradientBackground = styled.div`
	background-image: linear-gradient(0deg, ${theme.colors.black} 0%, ${theme.colors.grey} 100%);
	position: fixed;
	z-index: -1;
	width: 100vw;
	height: 100vh;
	left: 0;
	top: 0;
	pointer-events: none;
`
export const defaultHeaderProps = {
	languageSelector: false,
	registerLink: false,
	loginLink: false,
	loginSidebar: false,
	loggedIn: false,
	chat: false,
	hasChatNotification: false,
	hasProfileNotification: false,
};

const LoginPage = ({ t }) => {
    return (
        <>
			<BlueGradientBackground />
			<Header {...{t}} {...defaultHeaderProps} />
			<main>
				<FadeIn>
					<p>Geef steun aan de eerste linie Corona bestrijders en de andere helden die ons land draaiend houden. </p>
				</FadeIn>
			</main>
        </>
    );
};

LoginPage.getInitialProps = async () => ({
    namespacesRequired: ['common'],
});

withTranslation('common')(LoginPage);
export default withTranslation('common')(LoginPage);
