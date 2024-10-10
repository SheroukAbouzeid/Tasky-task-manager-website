import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import SideNavBar from "../components/SideNavBar";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom"; // Import useNavigate

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

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const navigate = useNavigate(); // Initialize the navigate function

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const limit = 0;
        const response = await fetch(
          `http://localhost:8000/api/getTasks/${userId}?limit=${limit}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch tasks");
        }
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  const handleViewTask = (task) => {
    // Navigate to the task details page with the task ID
    navigate(`/taskdetails/${task._id}`);
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const response = await fetch(`http://localhost:8000/api/deleteTask/${taskId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete task");
      }
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const columns = [
    { field: "title", headerName: "Title", width: 160 },
    { field: "priority", headerName: "Priority", width: 160 },
    { field: "tag", headerName: "Tag", width: 160 },
    { field: "status", headerName: "Status", width: 160 },
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
            checkboxSelection
            sx={{ border: 0 }}
            getRowId={(row) => row._id} // Ensure each row has a unique identifier
          />
        </Paper>
      </Container>
    </MainDiv>
  );
};

export default Tasks;
