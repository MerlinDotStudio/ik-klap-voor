import React from 'react';
import styled from '@emotion/styled';
import { mq, theme } from '../../../../styles/global';

const Title = styled.p`
    font-size: 1.875rem;
    font-weight: bold;
    color: ${theme.colors.greyType};

    margin: 0;

    width: auto !important;

    @media ${mq.max.medium} {
        margin-top: 1rem;
    }
`;

export default ({ text }) => {
    return <Title>{text}</Title>;
};
