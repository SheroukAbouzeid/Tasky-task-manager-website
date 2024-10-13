import React, { useEffect } from "react";
import styled from "styled-components";
import SideNavBar from "../components/SideNavBar";
import Dashboard from "./Dashboard";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

const MainDiv = styled.div`
  display: flex;
  height: 100vh;
  
  @media (max-width: 480px) {
    flex-direction: column; /* mobile */
  }
`;

const SideBarWrapper = styled.div`
  flex: 0.2;
  display: flex;
  justify-content: center;
  background: linear-gradient(to bottom, #393e46, #000);
  border-right: thin solid transparent;
  border-image: linear-gradient(to bottom, #b3b3b3, #393e46);
  border-image-slice: 1;

  @media (max-width: 768px) {
    flex: 0;
  }
  
`;


const DashboardWrapper = styled.div`
  flex: 0.8;
  background: #222831;
  padding: 2% 3%;
  color: white;
  display: flex;
  flex-direction: column;
  height: auto;
  overflow-y: auto; /* Allow vertical scrolling if content overflows */

  @media (max-width: 768px) {
    flex: 1; /* Full width small screens */
    padding: 5% 10%;
  }
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
        <Outlet />
      </DashboardWrapper>
    </MainDiv>
  );
};

export default Home;
