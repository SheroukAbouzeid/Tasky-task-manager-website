import React, { useState, useEffect } from "react";
import styled from "styled-components";
import AddTask from "../components/AddTask";
import TaskCalendar from "../components/TaskCalendar";
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';

const chartSetting = {
  xAxis: [
    {
      label: 'Tasks',
    },
  ],
  width: 465,
  height: 400,
  
};

const Header = styled.h3`
  margin: 10px;
  font-size: 32px;
  @media (max-width: 768px) {
    font-size: 20px;
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
  min-height: 20vh;
`;

const TaskItem = styled.div`
  background: linear-gradient(to bottom, #393e46, #222831);
  color: #32e0c4;
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 10px;
  box-shadow: 2px 2px 5px #222831;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }

  h4 {
    margin: 0;
    font-size: 18px;
  }

  p {
    margin: 5px 0 0 0;
    font-size: 14px;
  }
`;

const TaskGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  grid-gap: 10px;
`;

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

function Dashboard() {
  const [showModal, setShowModal] = useState(false);
  const [tasks, setTasks] = useState([
    { title: "Task 1", description: "Description for task 1", status: "inprogress" },
    { title: "Task 2", description: "Description for task 2", status: "inprogress" },
    { title: "Task 3", description: "Description for task 3", status: "completed" },
    { title: "Task 4", description: "Description for task 4", status: "completed" },
  ]);
  
  const [chartData, setChartData] = useState([
    { month: 'January', task: 100 },
    { month: 'February', task: 150 },
    { month: 'March', task: 120 },
    { month: 'April', task: 90 },
    { month: 'May', task: 200 },
  ]); // Sample chart data

  const pieChartData = [
    { category: "In Progress", value: tasks.filter(task => task.status === "inprogress").length },
    { category: "Completed", value: tasks.filter(task => task.status === "completed").length },
  ];

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

  // Fetch tasks on component mount (mock data is already in state)
  useEffect(() => {
    // Normally, you would fetch data here
    // fetchInProgressTasks();
  }, []);

  return (
    <>
      <Header>My Tasks</Header>

      <TaskGrid1>
        <TaskCard
          style={{ background: "linear-gradient(to bottom, #32e0c4, #393e46)" }}
        >
          <h3 style={{ color: "#222831" }}>Statistics</h3>
          <div style={{ display: 'flex', justifyContent: 'right', alignItems: 'center', width: '100%', height: '100%' }}>
            <BarChart
              dataset={chartData} // Pass the chart data
              yAxis={[
                {
                   scaleType: 'band',
                   dataKey: 'month',
                   padding:{left:20, right:20}
                  }
                ]}
              series={[{ dataKey: 'task', label: 'Task' }]} // Adjust dataKey to match your dataset
              layout="horizontal"
              {...chartSetting}
            />
          </div>
        </TaskCard>
        <TaskCard
  style={{ background: "linear-gradient(to bottom, #b3b3b3, #393e46)" }}
>
  <h3 style={{ color: "#222831", margin:"20px" }}>Progress Tracker</h3>
  <div 
    style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '300px', // Adjust the height of the container as needed
      width: '100%', // Full width of the TaskCard
      margin: '20px' // Optional: Add some top margin for spacing
    }}
  >
    <PieChart
      series={[{
        data: pieChartData,
        highlightScope: { fade: 'global', highlight: 'item' },
        faded: { innerRadius: 50, additionalRadius: -70, color: 'gray' },
        valueFormatter: (value) => `${value}`,
      }]}
      height={400} // Set a height for the PieChart
      width={400} // Set a width for the PieChart
    />
  </div>
</TaskCard>
      </TaskGrid1>

      <TaskGrid2>
        <TaskCard>
          <h3>In Progress</h3>
          <GridCol>
            <GridButton onClick={handleAddTaskClick}>+</GridButton>
            <Content>
              <Task tasks={tasks} status="inprogress" />
            </Content>
          </GridCol>
        </TaskCard>

        <TaskCard>
          <h3>Completed</h3>
          <GridCol>
            <Content
              style={{
                background: "linear-gradient(to bottom, #32e0c4, #393e46)",
              }}
            >
              <Task tasks={tasks} status="completed" />
            </Content>
          </GridCol>
        </TaskCard>

        <TaskCard>
          <h3>Calendar</h3>
          <Content>
            <TaskCalendar />
          </Content>
        </TaskCard>
      </TaskGrid2>

      <AddTask
        showModal={showModal}
        handleClose={handleCloseModal}
        handleSave={handleSaveTask}
      />
    </>
  );
}

export default Dashboard;
