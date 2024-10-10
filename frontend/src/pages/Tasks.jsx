import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import SideNavBar from "../components/SideNavBar";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import { useNavigate } from "react-router-dom";

const MainDiv = styled.div`
  display: flex;
  flex: 0.2;
  height: 100vh;

  @media (max-width: 480px) {
    flex-direction: column; /* mobile */
  }
`;

const Container = styled.div`
  display: flex;
  flex: 0.8;
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

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const response = await fetch(
          `http://localhost:8000/api/getTasks/${userId}`
        );
        if (!response.ok) throw new Error("Failed to fetch tasks");
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, []);

  const handleViewTask = (task) => {
    navigate(`/taskdetails/${task._id}`);
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/deleteTask/${taskId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) throw new Error("Failed to delete task");
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/updateTask/${taskId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );
      if (!response.ok) throw new Error("Failed to update task status");
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId ? { ...task, status: newStatus } : task
        )
      );
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  const columns = [
    {
      field: "status",
      headerName: "Completed",
      width: 160,
      renderCell: (params) => (
        <Checkbox
          checked={params.row.status === "completed"}
          onChange={() =>
            handleStatusChange(
              params.row._id,
              params.row.status === "completed" ? "pending" : "completed"
            )
          }
          color="primary"
        />
      ),
    },
    { field: "title", headerName: "Title", width: 160 },
    { field: "priority", headerName: "Priority", width: 160 },
    { field: "tag", headerName: "Tag", width: 160 },

    { field: "dueDate", headerName: "Due Date", width: 160 },
    {
      field: "viewTask",
      headerName: "View Task",
      width: 160,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleViewTask(params.row)}
        >
          Show More
        </Button>
      ),
    },
    {
      field: "delete",
      headerName: "Delete",
      width: 160,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="secondary"
          onClick={() => handleDeleteTask(params.row._id)}
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <MainDiv>
      <SideBarWrapper>
        <SideNavBar />
      </SideBarWrapper>

      <Container>
        <Paper sx={{ height: 700, width: "100%" }}>
          <DataGrid
            rows={tasks}
            columns={columns}
            pagination
            pageSizeOptions={[5, 10, 20]}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            sx={{ border: 0 }}
            getRowId={(row) => row._id}
          />
        </Paper>
      </Container>
    </MainDiv>
  );
};

export default Tasks;
