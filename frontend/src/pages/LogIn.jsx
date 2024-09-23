
import React, { useState } from "react";
import styled from "styled-components";

const MainDiv = styled.div`
  display: flex;
  height: 100vh;
  background-color: #222831;
  font-family: "Times New Roman", Times, serif; /* Set font to Times New Roman */
`;

const SideBanner = styled.div`
  background: linear-gradient(to bottom, #393e46, #32e0c4);
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SideContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const SideBannerLogo = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 180px;
    height: auto;
  }
`;

const SideBannerMockup = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 350px;
    height: auto;
  }
`;

const SideBannerText = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  p {
    font-size: 22px;
    text-align: center;
    max-width: 400px;
    color: #ffffff;
  }
`;

const LogInForm = styled.div`
  background-color: #222831;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LogInFormContainer = styled.form`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  max-width: 500px;
  padding: 0 20px;
`;

const LogInFormTitle = styled.div`
  flex: 0.5;
  display: flex;
  justify-content: center;
  align-items: center;

  h1 {
    font-size: 28px;
    color: #32e0c4;
  }
`;

const LogFormInputs = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
`;

const Inputs = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;

  input {
    flex: 1;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ffffff; 
    border-radius: 5px;
    background-color: transparent; 
    color: #ffffff; /* White text color */
    transition: border-color 0.3s, color 0.3s; 

    &:hover {
      border-color: #32e0c4;
    }

    &:focus {
      border-color: #32e0c4; 
      outline: none; 
    }
  }
`;

const LogInFormButton = styled.div`
  flex: 0.5;
  display: flex;
  justify-content: center;
  align-items: center;

  button {
    background: linear-gradient(to left, #393e46, #32e0c4);
    color: #ffffff;
    padding: 10px 20px;
    font-size: 18px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    width: 100%;
    max-width: 300px;
    transition: background 0.3s;

    &:hover {
      background: linear-gradient(to right, #393e46, #32e0c4);
    }
  }
`;

const LogInFormSignup = styled.div`
  flex: 0.5;
  display: flex;
  justify-content: center;
  align-items: center;

  p {
    font-size: 14px;
    color: #ffffff;

    .highlighted {
      color: #32e0c4; 
      cursor: pointer;
      transition: color 0.3s; 

      &:hover {
        color: #ffffff; 
      }
    }
  }
`;

  
const LogIn = () => {
  return (
    <MainDiv>
      <SideBanner>
        <SideContainer>
          <SideBannerLogo>
            <img src="..\assets\LOGO.png" alt="Tasky Logo" />
          </SideBannerLogo>
          <SideBannerMockup>
            <img src="..\assets\Desktop.png" alt="Desktop" />
          </SideBannerMockup>
          <SideBannerText>
            <p>
              Your go to Task manager!
            </p>
          </SideBannerText>
        </SideContainer>
      </SideBanner>

      <LogInForm>
        <LogInFormContainer>
          <LogInFormTitle>
            <h1>Welcome Back!</h1>
          </LogInFormTitle>
          <LogFormInputs>
            <Inputs>
              <input type="email" name="email" placeholder="Email" />
            </Inputs>
            <Inputs>
              <input type="password" name="password" placeholder="Password" />
            </Inputs>
          </LogFormInputs>
          <LogInFormButton>
            <button type="submit">Log In</button>
          </LogInFormButton>
          <LogInFormSignup>
            <p>
              Don't have an account? <span className="highlighted">Sign Up</span>
            </p>
          </LogInFormSignup>
        </LogInFormContainer>
      </LogInForm>
    </MainDiv>
  )
}

export default LogIn;
