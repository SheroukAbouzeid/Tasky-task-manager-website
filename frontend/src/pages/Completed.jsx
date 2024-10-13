//Completed.jsx
import React, { useState } from "react";
import styled from "styled-components";
import SideNavBar from "../components/SideNavBar";
import TaskCard from "../components/TaskCard";

// Styled Components for Completed

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
    { id: 1, name: "Task1", status: "in-progress" },
    { id: 2, name: "Task2", status: "completed" },
    { id: 3, name: "Task3", status: "in-progress" },
  ];

  const CompletedTasks = tasks.filter((task) => task.status === "completed");

  return (
    <>
      <SectionTitle>Completed</SectionTitle>
      <TaskList>
        {CompletedTasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </TaskList>
    </>
  );
};

export default TaskViewer;
