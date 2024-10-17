import React, { useState, useEffect } from "react";
import styled from "styled-components";
import TaskCard from "../components/TaskCard";

// Styled Components for InProgress

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
  const [inProgressTasks, setInProgressTasks] = useState([]);
  const fetchInProgressTasks = async () => {
    try {
      const userId = localStorage.getItem("userId"); // Retrieve user ID from local storage
      const response = await fetch(
        `http://localhost:8000/api/getInProgressTasks?userId=${userId}`
      );

      if (response.ok) {
        const data = await response.json();
        setInProgressTasks(data); // Update tasks state with fetched data
      } else {
        console.error("Error fetching tasks: ", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };
  useEffect(() => {
    fetchInProgressTasks(); // Fetch tasks on component mount
  }, []); // Empty dependency array ensures it runs only once when the component mounts


  return (
    <>
      <SectionTitle>In Progress</SectionTitle>
      <TaskList>
        {inProgressTasks.map((task, i) => (
          <TaskCard key={i} task={task} />
        ))}
      </TaskList>
    </>
  );
};

export default TaskViewer;
