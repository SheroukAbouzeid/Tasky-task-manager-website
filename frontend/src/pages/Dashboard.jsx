import React, { useState } from "react";
import styled from "styled-components";
import AddTask from "../components/AddTask";

const Header = styled.h3`
  margin: 10px;
  font-size: 32px;
`;

const TaskGrid1 = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 40px;
  margin-bottom: 5%;
`;

const TaskGrid2 = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 40px;
  margin-bottom: 5%;
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
  height: auto;
  min-height: 20vh;
`;

const Task = ({ tasks }) => {
  return (
    <div>
      {tasks.length > 0 ? (
        tasks.map((task, index) => (
          <div key={index} style={{ color: "#222831", marginBottom: '10px' }}>
            <p>{task.title}</p>
          </div>
        ))
      ) : (
        <p style={{ color: "#222831" }}>No tasks in progress</p>
      )}
    </div>
  );
};


function Dashboard() {
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

  return (
    <>
      <Header>My Tasks</Header>

      <TaskGrid1>
        <TaskCard
          style={{ background: "linear-gradient(to bottom, #32e0c4, #393e46)" }}
        >
          <h3 style={{ color: "#222831" }}>Statistics</h3>
        </TaskCard>
        <TaskCard
          style={{ background: "linear-gradient(to bottom, #b3b3b3, #393e46)" }}
        >
          <h3 style={{ color: "#222831" }}>Progress Tracker</h3>
        </TaskCard>
      </TaskGrid1>

      <TaskGrid2>
        <TaskCard>
          <h3>In Progress</h3>
          <GridCol>
            <GridButton onClick={handleAddTaskClick}>+</GridButton>
            <Content>
              <Task tasks={tasks} />
            </Content>
          </GridCol>
        </TaskCard>

        <TaskCard>
          <h3>Completed</h3>
          <GridCol>
            <GridButton>+</GridButton>
            <Content
              style={{
                background: "linear-gradient(to bottom, #32e0c4, #393e46)",
              }}
            ></Content>
          </GridCol>
        </TaskCard>

        <TaskCard>
          <h3>Calendar</h3>
          <Content></Content>
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
