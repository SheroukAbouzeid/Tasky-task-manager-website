// TaskCard.jsx
import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const TaskCard = ({ task }) => {
  const navigate = useNavigate()
  const handleViewTask = (task) => {
    navigate(`/home/taskdetails/${task._id}`);
  };

  return (
    <Card onClick={handleViewTask}>
      <TaskTitle>{task.title}</TaskTitle>

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
  cursor: pointer;
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
