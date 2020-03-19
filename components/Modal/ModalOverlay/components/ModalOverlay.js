import styled from '@emotion/styled';
import { mq } from '../../../../styles/global';


const ModalOverlay = styled.section`
    width: 100%;
    height: 100%;
    pointer-events: none;
    transform-origin: center;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 5;
`;

export default ModalOverlay;
