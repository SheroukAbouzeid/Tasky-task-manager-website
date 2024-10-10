// TaskCard.jsx
import React, { useState } from "react";
import styled from "styled-components";

const TaskCard = ({ task }) => {
  return (
    <Card>
      <TaskTitle>{task.name}</TaskTitle>
      
      <TaskStatus>{task.status}</TaskStatus>
    </Card>
  );
};

export default TaskCard;

// Styled Components for Task Cards
const Card = styled.div`
  background-color: #333;
  padding: 20px;
  border-radius: 8px;
  width: 200px;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TaskTitle = styled.h4`
  font-size: 1.2em;
  margin: 10px 0;
`;

const TaskStatus = styled.span`
  background-color: #24cca7;
  padding: 5px 10px;
  border-radius: 12px;
  color: white;
  font-size: 0.9em;
`;
