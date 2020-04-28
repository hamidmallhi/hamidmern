import React from 'react'
import styled from 'styled-components'



const Header = () => {
    return (
        <div>
        <MainContainer>
        <h1>Welcome to the <br />
        MERN stack Blog!</h1> 
        </MainContainer>  
          
        </div>
    )
}

export default Header

// main container

const MainContainer = styled.header`
background: url(../header-bg.jpg)no-repeat center/cover;
height: 25rem;

h1 {
    transform: translate(-50%, -50%);
    color: #fff;
    font-weight: 900;
    position: absolute;
    top: 25%;
    left: 50%;
}
`;

