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
                                        margin: '.5rem 0',
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
                                        right: 0.75rem;
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
											const regex = new RegExp(/aapmens|aarstulp|adder|addergebroed|apenkont|appelflap|autist|babok|badgast|baggerduiker|bangerd|barslet|bedrijfspoedel|beheime|belhamel|bengel|bermslet|bitch|bloedlijer|boer|boerenheikneuter|boerenhufter|boerenkaffer|boerenkarhengst|boerenkinkel|boerenpummel|boerin|bokkenrijder|bosneuker|botterik|bouwdoos|breezerslet|brilsmurf|bruinwerker|bulderbast|charlatan|choco|chocoladehoer|chocoladesnol|cijferneuker|del|dirkdoos|doos|dreuzel|droplul|druiloor|dwaas|eendenkont|eikel|etter|etterbuil|ezel|fielt|flapdrol|fleer|flessentrekker|flikker|galgenbrok|gangster|gannef|geit|geitenbreier|geitenneuker|geteisem|gluiper|gluiperd|gluipsnor|gratenbaal|greppeldel|grobbejanus|haai|halvezool|hapsnurker|harpij|heihaas|heikneuter|heks|hersenlijer|hockeytrut|hockeytut|hoerenjager|hoerenjong|hoerenkind|hoerenzoon|homo|hondenlul|hondenneuker|hufter|huppelkut|huzarenhoop|kaas|kaashoer|kaaskop|kaffer|kakhuis|kakmadam|kakmaker|kamelenneuker|kamerolifant|kanker|kankerhoer|kankerhond|kankerlijder|kankerlijer|kankernicht|kapsoneslijer|karhengst|karonje|kees|keilef|kelerelijer|keutelkut|kinkel|kip|kippenneuker|klafte|klapkut|klaplul|klapperaap|klere|kloefkapper|klojo|klooi|kloothannes|kloothommel|klootviool|klootzak|klote|kluns|knijpkont|koeskoesvreter|koffieboon|kokosmakroon|kontkruiper|kontneuker|kreng|kriel|krielkip|krijslijster|kruimelbuik|kruiper|kut|kutstreek|kuttenkop|kutvent|kutwijf|kwakzalver|labbekak|labrat|lafbek|lamstraal|lelijkerd|linkmiegel|lomperd|lomperik|loser|luibak|luibuis|luiskop|lul|lulhannes|lummel|macaronivreter|maffer|mafketel|mafkikker|makaak|mietje|mispruim|mispunt|mof|moffenhoer|Moffrika|mongool|morsebel|mosselhoer|muilezelin|muts|natkut|netenvreter|neukpaal|nitwit|noppeshoer|nul|oen|olijfneuker|onderkruipsel|optyfen|ossenkop|ossenlul|ouwehoedendoos|pagadder|palurk|paplap|pasjakroet|patjakker|pedo|pekelhoer|pepermuntvreter|pestlijder|pigmentvreter|pinda|pindachinees|pindapoepchinees|pleurislijder|ploert|plucheplakker|plurk|pokkenlijder|pokkenwijf|polak|politiemuts|pommel|populist|pothoer|puistenkop|pukkelbek|pummel|randdebiel|reetkever|reetveger|rekel|roetmop|rotmof|rotzak|rugridder|ruigpoot|sakkers|sambalburger|sambalvreter|schapenneuker|schelm|schijterd|schijtlaars|schijtlijster|schijtluis|schimmelkut|schobbejak|schoft|schurftkop|schurk|secreet|sekreet|slet|slettenbak|slijmerd|sloerie|smeerkanis|smeerlap|smeerpijp|smiecht|smous|snoever|snotaap|snotolf|sodemieter|sodomiet|soepkip|spaghettivreter|spast|steenezel|stinker|stinkerd|stoephoer|stomkop|strontzak|taalnazi|taart|teef|teringlijder|teringlijer|tietvlieg|totebel|trut|tyfuslijder|variétéhoer|varken|vetklep|vetzak|vlooienzak|vuilak|vullis|wipkip|zaagselkop|zakkenvuller|zakkenwasser|zalfpot|zeikbeer|zeikerd|zeikhannes|zeiklijster|zeiksnor|zeikstraal|zenuwenlijer|zenuwlijer|zeur|zeurkous|zeurpiet|zeurzak|zwijn|zwijnjak|kech|hoer|kkr|kut|slet|mongool|jood|joden|nazi|geil|neuken|pik|lul/)
											if(regex.test(TextRef.current.value)){
												alert('Het lijkt er op dat er scheldwoorden in je tekst staan, haal deze even weg aub!')
												return
											} else {
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
											}
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
