import React from "react";
import styled from "styled-components";
import SideNavBar from "../components/SideNavBar";
import Dashboard from "./Dashboard";

const MainDiv = styled.div`
  display: flex;
  flex-wrap: no-wrap
  height: 100vh;
`;

const SideBarWrapper = styled.div`
  flex: 0.2;
  display: flex;
  justify-content: center;
  background: linear-gradient(to bottom, #393e46, #000);
  border-right: thin solid transparent;
  border-image: linear-gradient(to bottom, #b3b3b3, #393e46);
  border-image-slice: 1; 
`;

const DashboardWrapper = styled.div`
  flex: 0.8;
  background: #222831;
  padding: 2% 3%;
  color: white;
  display: flex;
  flex-direction: column;
`;

const HomeHeader = styled.h1`
  font-size: 3em;
  font-weight: bold;
  margin-bottom: 30px;
`;
const Word = styled.span`
  color: ${(props) => props.color || "white"}; /* Default color is white */
`;

const TaskGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
`;

const TaskCard = styled.div`
  background: linear-gradient(to top right, #32e0c4, #393e46);
  padding: 20px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: bold;
  font-size: 18px;
`;

const Home = () => {
  return (
    <MainDiv>
      {/* Sidebar Section */}
      <SideBarWrapper>
        <SideNavBar />
      </SideBarWrapper>

      {/* Dashboard Section */}
      <DashboardWrapper>
        <HomeHeader>
          Hello
          <Word color="#b3b3b3"> User, </Word>
          Let’s Get Tasks
          <Word color="#32e0c4"> DONE!</Word>
        </HomeHeader>
        <Dashboard />
      </DashboardWrapper>
    </MainDiv>
  );
};

export default Home;
