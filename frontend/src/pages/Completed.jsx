//Completed.jsx
import React, { useState } from "react";
import styled from "styled-components";
import SideNavBar from "../components/SideNavBar";
import TaskCard from "../components/TaskCard";

// Styled Components for Completed
const MainDiv = styled.div`
  display: flex;
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

const TaskContainer = styled.div`
  margin-top: 20px;
  
`;

const SectionTitle = styled.h3`
  font-size: 1.4em;
  color: #24cca7;
  margin-bottom: 20px;
`;

const TaskList = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
`;


const TaskViewer = () => {
  const tasks = [
    { id: 1, name: "Design homepage", status: "in-progress" },
    { id: 2, name: "Develop login page", status: "completed" },
    { id: 3, name: "Write unit tests", status: "in-progress" },
  ];

  const CompletedTasks = tasks.filter(task => task.status === "completed");

  return (
    <MainDiv>
       <SideBarWrapper>
        <SideNavBar />
      </SideBarWrapper>
      <DashboardWrapper>
     
      <SectionTitle>In Progress</SectionTitle>
      <TaskList>
        {CompletedTasks.map(task => (
          <TaskCard key={task.id} task={task} />
        ))}
      </TaskList>
    
      </DashboardWrapper>
      
    </MainDiv>
    
  );
};

export default TaskViewer;

