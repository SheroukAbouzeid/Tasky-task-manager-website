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
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "steps",
    headerName: "Steps",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (value, row) => `${row.firstName || ""} ${row.lastName || ""}`,
  },
];

const rows = [
  { id: 1, lastName: "one", firstName: "Task" },
  { id: 2, lastName: "two", firstName: "Task" },
  { id: 3, lastName: "three", firstName: "Task" },
  { id: 4, lastName: "four", firstName: "Task" },
  { id: 5, lastName: "five", firstName: "Task" },
];

function TaskDetails() {
  const [showModal, setShowModal] = useState(false);
  const [tasks, setTasks] = useState([]);

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
      <Header>My Task</Header>

      <TaskGrid1>
        <TaskCard
          style={{ background: "linear-gradient(to bottom, #32e0c4, #393e46)" }}
        >
          <h3 style={{ color: "#222831" }}>Statistics</h3>
          <Paper sx={{ height: 400, width: "100%" }}>
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
    </>
  );
}

export default TaskDetails;
