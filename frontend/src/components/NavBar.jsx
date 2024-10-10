import React, { useState } from "react";
import styled from "styled-components";
import { Link as RouterLink } from "react-router-dom";

const StyledNavbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 0.5px solid;
  border-color: #222222;
  background-color: #000000;
  padding: 15px 20px;

  img {
    width: 16%;
    height: auto;
  }
  @media (max-width: 768px) {
    img {
      width: 50%; /* Adjust for smaller screens */
    }
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
      color: #32e0c4;
      cursor: pointer;
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    display: ${({ isOpen }) => (isOpen ? "block" : "none")}; /* Toggle visibility */
  }
`;

const StyledLink = styled(RouterLink)`
  text-decoration: none;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    margin-top: 10px;
  }
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

  @media (max-width: 768px) {
    margin-left: 0;
    margin-bottom: 10px;
    font-size: 12px;
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

  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

const Menu = styled.ul`
  display: flex;
  list-style: none;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    display: ${({ isOpen }) => (isOpen ? "block" : "none")}; 
  }
`;

const MenuItem = styled.li`
  margin: 0 20px;

  a {
    text-decoration: none;
    color: white;
    transition: color 0.3s;

    &:hover {
      color: #32e0c4;
    }
  }

  @media (max-width: 768px) {
    margin: 10px 0;
    text-align: center;
  }
`;

const NavIcon = styled.div`
  display: none;
  cursor: pointer;
  font-size: 24px;
  color: white;

  @media (max-width: 768px) {
    display: block;
  }
`;

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <StyledNavbar>
        <NavIcon onClick={toggleMenu}>
          {isOpen ? '✖' : '☰'}
        </NavIcon>
        <Nav isOpen={isOpen}>
          <StyledLink to="/">
            <h2>Home</h2>
          </StyledLink>
          <StyledLink to="/about">
            <h2>About</h2>
          </StyledLink>
          <StyledLink to="/contact">
            <h2>Contact</h2>
          </StyledLink>
        </Nav>
        <img src="../assets/LOGO_cropped.png" alt="Logo" />
        <ButtonContainer>
          <StyledLink to="/login">
            <LoginButton type="button">LOG IN</LoginButton>
          </StyledLink>
          <StyledLink to="/register">
            <SignupButton type="button">SIGN UP</SignupButton>
          </StyledLink>
        </ButtonContainer>
      </StyledNavbar>
    </>
  );
};

export default NavBar;
