import React from "react";
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

const InProgress = ({ showModal, handleClose, tasks }) => {
  const inProgressTasks = tasks.filter(task => task.status === 'inprogress');

  return (
    showModal && (
      <ModalBackground>
        <ModalContent>
          <CloseButton onClick={handleClose}>Close</CloseButton> 
          <h3>In Progress Tasks</h3>
          {inProgressTasks.length > 0 ? (
            <ul>
              {inProgressTasks.map((task, index) => (
                <li key={index}>{task.title}</li>
              ))}
            </ul>
          ) : (
            <p>No tasks in progress.</p>
          )}
        </ModalContent>
      </ModalBackground>
    )
  );
};

export default InProgress;
