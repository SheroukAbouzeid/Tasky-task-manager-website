import React from 'react';
import styled from 'styled-components';

const MainDiv = styled.div`
  display: flex;
  height: 100vh;
  background: linear-gradient(to bottom, #000000, #32e0c4);
  justify-content: center;
  align-items: center;
`;

const Mockup = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 10%;

  img {
    
    width: 110%;
    height: auto;
  }
`;

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-right: 10%;
  
  h2{
    color: #ffffff;
    font-size: 50px;
    text-align: center;
  }
  span{
    color: #32E0C4;
  }
`;

const GetstartedButton = styled.button`
  background: #000000;
  color: #32E0C4;
  padding: 10px 30px;
  margin: 20px;
  font-size: 18px;
  font-weight: bold; 
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 20px;       
  transition: background 0.3s;

  &:hover {
    background: linear-gradient(to right, #393e46, #32e0c4);
    color: #000000;
    border: 3px solid;
    border-color: #000000;
  }
`;

const HomePage = () => {
  return (
    <MainDiv>
        <Mockup>
            <img src="..\assets\screens_cropped.png" alt="Desktop" />
        </Mockup>
        <Container>
            <h2>Get Your <br/>Tasks Done <br/>Efficiently<br/> with <span>Tasky</span> </h2>
            <GetstartedButton type="button">Get Started</GetstartedButton>
        </Container>
        
    </MainDiv>
  );
}

export default HomePage;
