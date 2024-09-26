import React from 'react';
import styled from 'styled-components';

const MainDiv = styled.div`
  display: flex;
  flex-direction: column; 
  height: 100vh;
  background: linear-gradient(to bottom, #000000, #32e0c4);
  justify-content: center;
  align-items: center;
  color: white; 
  padding: 20px; 
  text-align: center; 
`;

const Title = styled.h1`
  font-size: 36px; 
  margin-bottom: 20px; 
`;

const Description = styled.p`
  font-size: 18px; 
  max-width: 600px; 
  line-height: 1.5; 
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

const AboutPage = () => {
  return (
    <MainDiv>
      <Title>About Tasky</Title>
      <Description>
        Tasky is a powerful task management tool designed to help you organize your life. Whether you’re a student juggling classes and assignments, a professional managing projects, or just someone looking to keep track of personal tasks, Tasky is here to streamline your workflow. 
      </Description>
      <Description>
        With Tasky, you can create, manage, and prioritize tasks effortlessly. Our intuitive interface allows you to categorize tasks, set deadlines, and track your progress in real-time. Say goodbye to chaos and hello to productivity!
      </Description>
      <GetstartedButton type="button">Get Started</GetstartedButton>
    </MainDiv>
  );
}

export default AboutPage;
