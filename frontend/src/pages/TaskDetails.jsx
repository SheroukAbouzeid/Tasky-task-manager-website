import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import {
  GaugeContainer,
  GaugeValueArc,
  GaugeReferenceArc,
  useGaugeState,
} from "@mui/x-charts/Gauge";

function GaugePointer() {
  const { valueAngle, outerRadius, cx, cy } = useGaugeState();

  if (valueAngle === null) {
    return null; // No value to display
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

const TaskGrid1 = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 5%;
  margin-bottom: 5%;
  @media (max-width: 480px) {
    grid-template-columns: 1fr; /* 1 column on mobile */
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

const columns = [
  { field: "steps", headerName: "Steps", width: 300 },
];

function TaskDetails() {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null); // State to track the selected task
  const [gaugeValue, setGaugeValue] = useState(30); // Example dynamic gauge value

  const fetchInProgressTasks = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const limit = 4;
      const response = await fetch(
        `http://localhost:8000/api/getInProgressTasks?userId=${userId}&limit=${limit}`
      );
      if (response.ok) {
        const data = await response.json();
        console.log("Fetched Tasks: ", data); // Debugging log
        const formattedTasks = data.map((task, index) => ({
          id: index + 1,
          title: task.title,
          steps: task.steps ? task.steps.join(", ") : "No steps",
        }));
        setTasks(formattedTasks);
        if (formattedTasks.length > 0) {
          setSelectedTask(formattedTasks[0]); // Set the first task as default selected
        }
      } else {
        console.error("Error fetching tasks: ", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchInProgressTasks();
  }, []);

  return (
    <>
      <Header>Task details</Header>
      <TaskGrid1>
        <TaskCard style={{ background: "linear-gradient(to bottom, #32e0c4, #393e46)" }}>
          <h3 style={{ color: "#222831" }}>
            {selectedTask ? selectedTask.title : "Select a Task"}
          </h3>
          <Paper sx={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={tasks}
              columns={columns}
              pageSizeOptions={[5, 10]}
              checkboxSelection
              onRowClick={(params) => {
                setSelectedTask(params.row); // Update selected task on row click
              }}
              sx={{ border: 0 }}
            />
          </Paper>
        </TaskCard>
        <TaskCard style={{ background: "linear-gradient(to bottom, #b3b3b3, #393e46)" }}>
          <h3 style={{ color: "#222831" }}>Progress Tracker</h3>
          <GaugeContainer
            width={200}
            height={200}
            startAngle={-110}
            endAngle={110}
            value={gaugeValue} // Set this value based on your application logic
          >
            <GaugeReferenceArc />
            <GaugeValueArc />
            <GaugePointer />
          </GaugeContainer>
        </TaskCard>
      </TaskGrid1>
    </>
  );
}

export default TaskDetails;
