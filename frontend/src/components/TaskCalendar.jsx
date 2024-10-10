import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styled from "styled-components";

const CalendarWrapper = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;

const StyledCalendar = styled(Calendar)`
  width: 100%;
  height: auto;
  border: none;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #32e0c4;

  .react-calendar__tile {
    background: #ffffff;
    color: black;
    padding: 15px;
    font-size: 1.2rem;

    &:hover {
      background-color: #32e0c4;
      color: black;
    }
  }

  .react-calendar__tile--now {
    background: #32e0c4;
    color: black;
  }

  .react-calendar__tile--active {
    background: #ffffff;
    color: #32e0c4;
  }

  /* Highlighted dates */
  .highlight {
    background-color: #ffcc00; /* Change to your preferred highlight color */
    color: black;
    font-weight: bold; /* Optional: Make highlighted dates stand out */
  }
`;

const TaskCalendar = () => {
  const [tasks, setTasks] = useState([]);

  // Function to fetch tasks
  const fetchTasks = async () => {
    try {
      const userId = localStorage.getItem("userId"); // Replace with the actual userId
      if (!userId) {
        console.error("User ID not found in localStorage");
        return; // Exit if userId is not found
      }

      const response = await fetch(`http://localhost:8000/api/getTasks?userId=${userId}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Fetched tasks:", data); // Log the fetched tasks
      if (data.length === 0) {
        console.log("No tasks found."); // Log if no tasks are fetched
      }
      data.forEach(task => console.log("Due Date:", task.dueDate)); // Log each due date
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // Fetch tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  // Highlight tile if it matches any task date
  const highlightDates = ({ date, view }) => {
    if (view === "month") {
      const taskDates = getTaskDates();

      // Log the current date for debugging
      console.log("Current Date:", date);
      console.log("Task Dates for Highlighting:", taskDates);

      // Check if the current date matches any task date
      return taskDates.some(taskDate =>
        taskDate.getFullYear() === date.getFullYear() &&
        taskDate.getMonth() === date.getMonth() &&
        taskDate.getDate() === date.getDate()
      )
        ? "highlight"
        : null;
    }
  };

  // Function to extract and format task dates
  const getTaskDates = () => {
    return tasks.map(task => {
      const [year, month, day] = task.dueDate.split("-"); // Assuming dueDate is in "yyyy-mm-dd"
      return new Date(year, month - 1, day); // Create a Date object (month is 0-indexed)
    });
  };

  return (
    <CalendarWrapper>
      <StyledCalendar
        tileClassName={highlightDates}
        showNeighboringMonth={false} // Corrected prop name
      />
    </CalendarWrapper>
  );
};

export default TaskCalendar;
