import React, { useState, useEffect } from "react";
import styled from "styled-components";
import AddTask from "../components/AddTask";
import TaskCalendar from "../components/TaskCalendar";
import SideNavBar from "../components/SideNavBar";
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import {
  GaugeContainer,
  GaugeValueArc,
  GaugeReferenceArc,
  useGaugeState,
} from '@mui/x-charts/Gauge';

function GaugePointer() {
    const { valueAngle, outerRadius, cx, cy } = useGaugeState();
  
    if (valueAngle === null) {
      // No value to display
      return null;
    }
  
    const target = {
      x: cx + outerRadius * Math.sin(valueAngle),
      y: cy - outerRadius * Math.cos(valueAngle),
    };
    return (
      <g>
        <circle cx={cx} cy={cy} r={5} fill="red" />
        <path
          d={`M ${cx} ${cy} L ${target.x} ${target.y}`}
          stroke="red"
          strokeWidth={3}
        />
      </g>
    );
  }

const Header = styled.h3`
  margin: 10px;
  font-size: 32px;
  @media (max-width: 768px) {
    font-size: 20px;
  }
`;
const MainDiv = styled.div`
  display: flex;
  flex: 0.2;
  height: 200vh;

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
  height: 100%;

  @media (max-width: 768px) {
    flex: 1; /* Full width small screens */
    padding: 5% 10%;
  }
`;

const TaskGrid1 = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 5%;
  margin-bottom: 5%;

  @media (max-width: 480px) {
    grid-template-columns: 1fr; /* 1 column on mobile */
  }
`;

const TaskGrid2 = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 5%;
  margin-bottom: 5%;

  @media (max-width: 768px) {
    grid-template-columns: 1fr; /* 1 column on all small screens */
  }
`;

const TaskCard = styled.div`
  height: auto;
  min-height: 20vh;
  flex-grow: 1;
  border-radius: 10px;
  padding: 20px;
  color: #fff;

  @media (max-width: 480px) {
    font-size: 16px; /* Adjust font size on mobile */
    padding: 10px;
  }
`;

const GridCol = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: flex-start;
`;

const GridButton = styled.button`
  background: linear-gradient(to bottom, #393e46, #222831);
  border: none;
  border-radius: 15px;
  box-shadow: 2px 3px 8px #000;
  color: #b3b3b3;
  font-size: 40px;
  cursor: pointer;
  margin-top: 20px;
  transition: color 0.3s ease;

  &:hover {
    color: #32e0c4;
  }
`;

const Content = styled.div`
  flex-grow: 1;
  background: linear-gradient(to bottom, #b3b3b3, #393e46);
  border-radius: 10px;
  padding: 20px;
  margin: 20px 0;
  height: auto;
  min-height: 20vh;
`;

const TaskItem = styled.div`
  background: linear-gradient(to bottom, #393e46,#222831);
  color: #32e0c4;
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 10px;
  box-shadow: 2px 2px 5px #222831;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

const TaskGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  grid-gap: 10px;
`;

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    {
      field: 'steps',
      headerName: 'Steps',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
    },
  ];
  
  const rows = [
    { id: 1, lastName: 'one', firstName: 'Task' },
    { id: 2, lastName: 'two', firstName: 'Task' },
    { id: 3, lastName: 'three', firstName: 'Task' },
    { id: 4, lastName: 'four', firstName: 'Task'},
    { id: 5, lastName: 'five', firstName: 'Task'}
  ];

const Task = ({ tasks, status }) => {
  const filteredTasks = tasks
    .filter((task) => task.status === status)
    .slice(0, 3);

  // Check if there are any tasks to display
  if (filteredTasks.length === 0) {
    return (
      <p style={{ color: "#222831" }}>
        No tasks {status === "inprogress" ? "in progress" : "completed"}
      </p>
    );
  }

  return (
    <TaskGrid>
      {filteredTasks.map((task, index) => (
        <TaskItem key={index}>
          <h4>{task.title}</h4>
          <p>{task.description}</p>
        </TaskItem>
      ))}
    </TaskGrid>
  );
};

function TaskDetails() {
  const [showModal, setShowModal] = useState(false);
  const [tasks, setTasks] = useState([]);

  const handleAddTaskClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSaveTask = (newTask) => {
    if (newTask) {
      setTasks((prevTasks) => [...prevTasks, newTask]);
    }
    setShowModal(false);
  };

  // Function to fetch in-progress tasks
  const fetchInProgressTasks = async () => {
    try {
      const userId = localStorage.getItem("userId"); // Replace with the actual userId
      const limit = 4;
      const response = await fetch(
        `http://localhost:8000/api/getInProgressTasks?userId=${userId}&limit=${limit}`
      );
      if (response.ok) {
        const data = await response.json();
        setTasks(data);
      } else {
        console.error("Error fetching tasks: ", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // Fetch tasks on component mount
  useEffect(() => {
    fetchInProgressTasks();
  }, []);

  return (
    <>
    <MainDiv>
    <SideBarWrapper>
        <SideNavBar />
      </SideBarWrapper>

      <DashboardWrapper>
      <Header>My Tasks</Header>

      <TaskGrid1>
        <TaskCard
          style={{ background: "linear-gradient(to bottom, #32e0c4, #393e46)" }}
        >
          <h3 style={{ color: "#222831" }}>Statistics</h3>
          <Paper sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
      
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>
        </TaskCard>
        <TaskCard
          style={{ background: "linear-gradient(to bottom, #b3b3b3, #393e46)" }}
        >
          <h3 style={{ color: "#222831" }}>Progress Tracker</h3>
          <GaugeContainer
      width={200}
      height={200}
      startAngle={-110}
      endAngle={110}
      value={30}
    >
      <GaugeReferenceArc />
      <GaugeValueArc />
      <GaugePointer />
    </GaugeContainer>
        </TaskCard>
      </TaskGrid1>

      <AddTask
        showModal={showModal}
        handleClose={handleCloseModal}
        handleSave={handleSaveTask}
      />
      </DashboardWrapper>
      </MainDiv>
    </>
    
  );
}

export default TaskDetails;
