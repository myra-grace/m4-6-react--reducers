import React from 'react';
import styled from 'styled-components';

export const SuccessfulPurchase = () => {

    return (
        <Wrapper>
            <h1>Successful Purchase</h1>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    display: flex;
    justify-content: center;
    align-items: center;
`;