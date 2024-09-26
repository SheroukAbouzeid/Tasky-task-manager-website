import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledNavbar = styled.div`
  display: flex;
  align-items: center;       
  justify-content: space-between; 
  border: 0.5px, solid;
  border-color: #222222;
  background-color: #000000;
  padding: 15px 20px;       
  img {
    width: 16%; 
    height: auto; 
  }
`;

const Nav = styled.div`
  display: flex;
  align-items: center;      
  
  h2 {
    color: #ffffff;         
    margin: 0 20px;       
    transition: color 0.3s; 
    font-size: 18px;

    @media (min-width: 768px) {
      font-size: 24px; 
    }
    @media (min-width: 1024px) {
      font-size: 30px; 
    }
    &:hover {
      color: #32E0C4;
      cursor: pointer;
    }
  }
`;

const ButtonContainer = styled.div`
  display: flex;            
  align-items: center;      
`;

const LoginButton = styled.button`
  background: #000000;
  color: #32e0c4;
  padding: 5px 20px;
  font-size: 18px;
  font-weight: bold; 
  border: 2px solid;
  border-color: #32e0c4;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 20px;       
  transition: background 0.3s;

  &:hover {
    background: linear-gradient(to right, #393e46, #32e0c4);
    color: #000000;
    border: none;
    padding: 6px 20px;
  }
`;

const SignupButton = styled.button`
  background: #32e0c4;
  color: #000000;
  padding: 6px 20px;
  font-size: 18px;
  font-weight: bold; 
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 20px;       
  transition: background 0.3s;

  &:hover {
    background: linear-gradient(to right, #393e46, #32e0c4);
  }
`;

const NavBar = () => {
  return (
    <StyledNavbar>
      <img src="../assets/LOGO_cropped.png" alt="Logo" />
      <Nav>
      <Link to="/">
        <h2>Home</h2>
        </Link>
        <Link to="/about">
        <h2>About</h2>
        </Link>
        <Link to="/contact">
        <h2>Contact</h2>
        </Link>
      </Nav>
      <ButtonContainer>
        <Link to="/login">
          <LoginButton type="button">LOG IN</LoginButton>
        </Link>
        <Link to="/register">
          <SignupButton type="button">SIGN UP</SignupButton>
        </Link>
      </ButtonContainer>
    </StyledNavbar>
  );
}

export default NavBar;
