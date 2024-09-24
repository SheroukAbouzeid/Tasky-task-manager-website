import React from "react";
import styled from "styled-components";

const StyledSidebar = styled.div`
  width: 250px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  color: white;
`;

const ListItem = styled.li`
  list-style-type: none;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
`;

const List = styled.ul`
  padding-left: 0;
`;

const StyledImage = styled.img`
  margin-right: 10px;
`;


function SideNavBar() {
  return (
    <StyledSidebar>
    <img src="../assets/LOGO.png" alt="Logo" width="100%" />
    <List>
      <ListItem>
        <StyledImage src="../assets/dashboard.png" width="30%" alt="Dashboard" />
        Dashboard
      </ListItem>
      <ListItem>
        <StyledImage src="../assets/Calendar.png" width="30%" alt="Calendar" />
        Calendar
      </ListItem>
      <ListItem>
        <StyledImage src="../assets/Tasks.png" width="30%" alt="Tasks" />
        Tasks
        <List>
          <InnerListItem>In Progress</InnerListItem>
          <InnerListItem>Completed</InnerListItem>
        </List>
      </ListItem>
      <ListItem>Settings</ListItem>
    </List>
    <div>
      <p>User Name</p>
      <p>user@gmail.com</p>
      <button>Log out</button>
    </div>
  </StyledSidebar>
  );
}

export default SideNavBar;
