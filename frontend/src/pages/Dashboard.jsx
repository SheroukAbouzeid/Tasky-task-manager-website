import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import AddTask from "../components/AddTask";
import TaskCalendar from "../components/TaskCalendar";
import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart } from "@mui/x-charts/PieChart";

const Header = styled.h3`
  margin: 10px;
  font-size: 32px;
  @media (max-width: 768px) {
    font-size: 20px;
  }
`;
const HomeHeader = styled.h1`
  font-size: 3em;
  font-weight: bold;
  margin-bottom: 30px;
  @media (max-width: 768px) {
    font-size: 2em;
  }
`;

const Word = styled.span`
  color: ${(props) => props.color || "white"}; /* Default color is white */
`;
const TaskGrid1 = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 5%;
  margin-bottom: 5%;

  @media (max-width: 768px) {
    grid-template-columns: 1fr; /* 1 column on mobile */
  }
`;

const TaskGrid2 = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 5%;
  margin-bottom: 5%;

  @media (max-width: 980px) {
    grid-template-columns: repeat(2, 1fr); /* 2 columns for tablets */
  }

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

  // p {
  //   color: #fff;
  //   margin: 5px 0 0 0;
  //   font-size: 14px;
  // }
`;

const TaskGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  grid-gap: 10px;
`;

const Task = ({ tasks, status }) => {
  const filteredTasks = tasks
    .filter((task) => task.status === status)
    .slice(0, 5);

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
          {/* <p>{task.description}</p> */}
        </TaskItem>
      ))}
    </TaskGrid>
  );
};

function Dashboard() {
  const [showModal, setShowModal] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [chartSize, setChartSize] = useState({ width: 465, height: 400 }); // Default chart siz
  const navigate = useNavigate();
  const firstName = localStorage.getItem("firstName");

  useEffect(() => {
    const email = localStorage.getItem("email");
    // If the user is not logged in, redirect to the login page
    if (!email) {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  const [chartData, setChartData] = useState([
    { month: "January", task: 100 },
    { month: "February", task: 150 },
    { month: "March", task: 120 },
    { month: "April", task: 90 },
    { month: "May", task: 200 },
  ]); // Sample chart data

  const pieChartData = [
    {
      category: "In Progress",
      value: tasks.filter((task) => task.status === "inprogress").length,
    },
    {
      category: "Completed",
      value: tasks.filter((task) => task.status === "completed").length,
    },
  ];

  const handleResize = () => {
    const screenWidth = window.innerWidth;

    if (screenWidth <= 480) {
      setChartSize({ width: 300, height: 250 }); // Smaller size for mobile
    } else if (screenWidth <= 768) {
      setChartSize({ width: 400, height: 300 }); // Medium size for tablet
    } else {
      setChartSize({ width: 465, height: 400 }); // Default for larger screens
    }
  };
  useEffect(() => {
    handleResize(); // Set chart size on initial load
    window.addEventListener("resize", handleResize); // Update chart size on screen resize

    return () => window.removeEventListener("resize", handleResize); // Cleanup
  }, []);
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

  // Function to fetch tasks
  const fetchTasks = async () => {
    try {
      const userId = localStorage.getItem("userId"); // Retrieve user ID from local storage
      const response = await fetch(
        `http://localhost:8000/api/getTasks/${userId}`
      );

      if (response.ok) {
        const data = await response.json();
        setTasks(data); // Update tasks state with fetched data
      } else {
        console.error("Error fetching tasks: ", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // Fetch tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <>
      <HomeHeader>
        Hello
        <Word color="#b3b3b3"> {firstName}, </Word>
        Let’s Get Tasks
        <Word color="#32e0c4"> DONE!</Word>
      </HomeHeader>
      <Header>My Tasks</Header>

      <TaskGrid1>
        <TaskCard
          style={{
            background: "linear-gradient(to bottom, #32e0c4, rgb(135 134 133))",
          }}
        >
          <h3 style={{ color: "#222831" }}>Statistics</h3>
          <div
            style={{
              display: "flex",
              justifyContent: "right",
              alignItems: "center",
              width: "100%",
              height: "100%",
            }}
          >
            <BarChart
              dataset={chartData} // Pass the chart data
              yAxis={[
                {
                  scaleType: "band",
                  dataKey: "month",
                  padding: { left: 20, right: 20 },
                },
              ]}
              series={[{ dataKey: "task", label: "Task", color: "#222831" }]} // Adjust dataKey to match your dataset
              layout="horizontal"
              width={chartSize.width} // Use dynamic width
              height={chartSize.height} // Use dynamic height
            />
          </div>
        </TaskCard>

        <TaskCard
          style={{ background: "linear-gradient(to bottom, #b3b3b3, #393e46)" }}
        >
          <h3 style={{ color: "#222831" }}>Progress Tracker</h3>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "100%",
            }}
          >
            <PieChart
              series={[
                {
                  data: pieChartData,
                  highlightScope: { fade: "global", highlight: "item" },
                  faded: {
                    innerRadius: 30,
                    additionalRadius: -30,
                    color: "gray",
                  },
                  valueFormatter: (value) => `${value.category} ${(value.data / tasks.length * 100).toFixed(2)}%`,
                },
              ]}
              width={chartSize.width} // Adjusted width for pie chart
              height={chartSize.height / 2} // Adjusted height for pie chart
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
