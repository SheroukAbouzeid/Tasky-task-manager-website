import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  GaugeContainer,
  GaugeValueArc,
  GaugeReferenceArc,
  useGaugeState,
} from "@mui/x-charts/Gauge";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

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
      <circle cx={cx} r={5} fill="red" />
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

const TaskGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 5%;
  margin-bottom: 5%;
  @media (max-width: 480px) {
    grid-template-columns: 1fr; /* 1 column on mobile */
  }
`;

const TaskCard = styled.div`
  height: auto;
  min-height: 20vh;
  border-radius: 10px;
  padding: 20px;
  color: #fff;
  @media (max-width: 480px) {
    font-size: 16px; /* Adjust font size on mobile */
    padding: 10px;
  }
`;

function TaskDetails() {
  const [selectedTask, setSelectedTask] = useState(null);
  const [gaugeValue, setGaugeValue] = useState(30);

  const taskDetail = async () => {
    const taskId = window.location.pathname.split("/")[3];
    try {
      const response = await fetch(
        `http://localhost:8000/api/getTask/${taskId}`
      );
      if (response.ok) {
        const data = await response.json();
        setSelectedTask(data);
      } else {
        console.error("Error fetching tasks: ", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    taskDetail();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleStepChange = async (index, field, value) => {
    const updatedSteps = [...selectedTask.steps];
    updatedSteps[index][field] = value; // Update the specified field

    // Update the selected task with the modified steps
    setSelectedTask((prev) => ({ ...prev, steps: updatedSteps }));

    // Send the updated task to the API
    try {
      const response = await fetch(
        `http://localhost:8000/api/updateTask/${selectedTask._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...selectedTask, steps: updatedSteps }), // Send updated steps
        }
      );
      if (!response.ok) throw new Error("Failed to update task");
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleAddStep = () => {
    setSelectedTask((prev) => ({
      ...prev,
      steps: [...prev.steps, { stepName: "", isComplete: false }], // Update to match DB format
    }));
  };

  const handleRemoveStep = (index) => {
    const updatedSteps = [...selectedTask.steps];
    updatedSteps.splice(index, 1);
    setSelectedTask((prev) => ({ ...prev, steps: updatedSteps }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:8000/api/updateTask/${selectedTask._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(selectedTask),
        }
      );
      if (!response.ok) throw new Error("Failed to update task");
      alert("Task updated successfully!");
      taskDetail(); // Refresh tasks after updating
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <>
      <Header>Task Details</Header>
      <TaskGrid>
        {selectedTask && (
          <TaskCard
            style={{
              background: "linear-gradient(to bottom, #00adb5, #393e46)",
            }}
          >
            <h3 style={{ color: "#222831" }}>Edit Task</h3>
            <form onSubmit={handleFormSubmit}>
              <TextField
                name="title"
                label="Title"
                value={selectedTask.title}
                onChange={handleInputChange}
                fullWidth
                required
                margin="normal"
              />
              <TextField
                name="description"
                label="Description"
                value={selectedTask.description}
                onChange={handleInputChange}
                fullWidth
                multiline
                rows={4}
                margin="normal"
              />
              <TextField
                name="dueDate"
                label="Due Date"
                type="date"
                value={selectedTask.dueDate}
                onChange={handleInputChange}
                fullWidth
                InputLabelProps={{ shrink: true }}
                margin="normal"
              />
              <TextField
                name="priority"
                label="Priority"
                value={selectedTask.priority}
                onChange={handleInputChange}
                select
                fullWidth
                margin="normal"
              >
                <MenuItem value="high">High</MenuItem>
                <MenuItem value="mid">Mid</MenuItem>
                <MenuItem value="low">Low</MenuItem>
              </TextField>
              <TextField
                name="tag"
                label="Tag"
                value={selectedTask.tag}
                onChange={handleInputChange}
                select
                fullWidth
                margin="normal"
              >
                <MenuItem value="work">Work</MenuItem>
                <MenuItem value="school">School</MenuItem>
                <MenuItem value="home">Home</MenuItem>
                <MenuItem value="project">Project</MenuItem>
                <MenuItem value="health">Health</MenuItem>
                <MenuItem value="sports">Sports</MenuItem>
              </TextField>
              <TextField
                name="status"
                label="Status"
                value={selectedTask.status}
                onChange={handleInputChange}
                select
                fullWidth
                margin="normal"
              >
                <MenuItem value="inprogress">In Progress</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
              </TextField>

              <h3 style={{ color: "#222831" }}>Steps</h3>
              {selectedTask.steps.map((step, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <TextField
                    label={`Step ${index + 1}`}
                    value={step.stepName}
                    onChange={(e) =>
                      handleStepChange(index, "stepName", e.target.value)
                    }
                    fullWidth
                    margin="normal"
                  />
                  <Checkbox
                    checked={step.isComplete} // Update to match DB format
                    onChange={
                      (e) =>
                        handleStepChange(index, "isComplete", e.target.checked) // This updates the isComplete status
                    }
                    color="primary"
                    style={{ marginLeft: "10px" }}
                  />
                  <IconButton
                    onClick={() => handleRemoveStep(index)}
                    color="secondary"
                  >
                    <DeleteIcon />
                  </IconButton>
                </div>
              ))}
              <Button
                onClick={handleAddStep}
                variant="outlined"
                color="primary"
                startIcon={<AddIcon />}
                style={{ marginBottom: "20px" }}
              >
                Add Step
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                style={{ marginTop: "20px" }}
              >
                Update Task
              </Button>
            </form>
          </TaskCard>
        )}
        <TaskCard
          style={{
            background: "linear-gradient(to bottom, #b3b3b3, #393e46)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h3 style={{ color: "#222831" }}>Progress Tracker</h3>
          <GaugeContainer
            width={500}
            height={500}
            startAngle={-110}
            endAngle={110}
            value={gaugeValue}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <GaugeReferenceArc />
            <GaugeValueArc />
            <GaugePointer />
          </GaugeContainer>
        </TaskCard>
      </TaskGrid>
    </>
  );
}

export default TaskDetails;
