import React, { useState } from "react";
import styled from "styled-components";

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: #222831;
  padding: 40px;
  border-radius: 10px;
  width: 50%;
  color: white;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const CloseButton = styled.button`
  background-color: #f05454;
  color: white;
  border: none;
  padding: 10px 20px;
  margin: 8px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  align-self: flex-end;

  &:hover {
    background-color: #393e46;
  }
`;

const AddTaskButton = styled.button`
  background-color: #32e0c4;
  border: none;
  padding: 10px 20px;
  margin: 8px;
  border-radius: 5px;
  cursor: pointer;
  color: white;
  font-weight: bold;
  align-self: center;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #393e46;
  border-radius: 5px;
  color: #000;
`;

const Select = styled.select`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #393e46;
  border-radius: 5px;
  color: #000;
`;

const Label = styled.label`
  font-size: 16px;
  color: white;
  margin-bottom: 5px;
`;

const AddTask = ({ showModal, handleClose, handleSave }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("mid");
  const [tag, setTag] = useState("work");
  const [status, setStatus] = useState("inprogress");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newTask = {
      title,
      description,
      dueDate,
      priority,
      tag,
      status,
      userID: "someUserID", // Replace this with actual user ID
    };

    try {
      const response = await fetch("http://localhost:8000/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Task added:", data);

      handleSave(newTask);
      handleClose();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    showModal && (
      <ModalBackground>
        <ModalContent>
          <CloseButton onClick={handleClose}>Close</CloseButton>

          <form onSubmit={handleSubmit}>
            <FormGroup>
              <Label>Title</Label>
              <Input
                type="text"
                placeholder="Add title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label>Description</Label>
              <Input
                type="text"
                placeholder="Add description..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormGroup>

            <FormGroup>
              <Label>Due Date</Label>
              <Input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label>Priority</Label>
              <Select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                required
              >
                <option value="high">High</option>
                <option value="mid">Mid</option>
                <option value="low">Low</option>
              </Select>
            </FormGroup>

            <FormGroup>
              <Label>Tag</Label>
              <Select
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                required
              >
                <option value="school">School</option>
                <option value="work">Work</option>
                <option value="sports">Sports</option>
                <option value="home">Home</option>
                <option value="project">Project</option>
                <option value="health">Health</option>
              </Select>
            </FormGroup>

            <FormGroup>
              <Label>Status</Label>
              <Select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                required
              >
                <option value="inprogress">In Progress</option>
                <option value="completed">Completed</option>
              </Select>
            </FormGroup>

            <AddTaskButton type="submit">Save Task</AddTaskButton>
          </form>
        </ModalContent>
      </ModalBackground>
    )
  );
};

export default AddTask;
