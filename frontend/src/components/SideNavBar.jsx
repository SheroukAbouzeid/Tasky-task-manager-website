import React, { useState } from "react";
import styled from "styled-components";

const StyledSidebar = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 20px;
  color: #b3b3b3;
`;
const ToggleButton = styled.button`
background: transparent;
  border: none;
  color: #b3b3b3;
  font-size: 20px;
  font-whight: bold;
  cursor: pointer;
  margin-left: 10px;
  &:hover {
    color: #32e0c4; 

`;
const List = styled.ul`
  padding: 8%;
`;
const ListItem = styled.li`
  list-style-type: none;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.3s;
   &:hover {
    color: #fff; 
`;

const InnerListItem = styled.li`
  list-style-type: none;
  margin-bottom: 15px;
  display: flex;
`;

const StyledImage = styled.img`
  margin-right: 10px;
  width: 20%;
`;
const ListSpan = styled.span`
  margin-right: 10px;
  width: 20%;
`;
const User = styled.h3`
display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.3s;
   &:hover {
    color: #32e0c4; 
`;

function SideNavBar() {
  const [open, setOpen] = useState(false);
  const handleListToggle = () => {
    setOpen((open) => !open);
  };

  return (
    <StyledSidebar>
      <img src="../assets/LOGO.png" alt="Logo" width="100%" />
      <List
        style={{
          borderBottom: "thin solid #222831",
          borderTop: "thin solid #222831",
        }}
      >
        <ListItem>
          <StyledImage src="../assets/dashboard.png" alt="Dashboard" />
          Dashboard
        </ListItem>
        <ListItem>
          <StyledImage src="../assets/Calendar.png" alt="Calendar" />
          Calendar
        </ListItem>
      </List>
      <List style={{ borderBottom: "thin solid #393e46" }}>
        <ListItem>
          <StyledImage src="../assets/Tasks.png" alt="Tasks" />
          Tasks{" "}
          <ToggleButton onClick={handleListToggle}>
            {open ? "∧" : "∨"}
          </ToggleButton>
        </ListItem>
        {open && (
          <List style={{ borderLeft: "thin solid #32e0c4", marginLeft: "20%" }}>
            <InnerListItem>
              <ListSpan style={{ color: "#b3b3b3" }}>⦿ </ListSpan> In Progress
            </InnerListItem>
            <InnerListItem>
              <ListSpan style={{ color: "#32e0c4" }}>★ </ListSpan> Completed
            </InnerListItem>
          </List>
        )}
      </List>
      <List style={{ borderBottom: "thin solid #393e46" }}>
        <ListItem>
          <StyledImage src="../assets/settings.png" alt="settings" /> Settings
        </ListItem>
        <ListItem>
          <StyledImage
            src="../assets/logout.svg"
            alt="logout"
            style={{ width: "10%" }}
          />
          Log out
        </ListItem>
      </List>
      <div>
        <User>
          <StyledImage src="../assets/User.png" alt="User" />
          User Name
        </User>
        <p>user@gmail.com</p>
      </div>
    </StyledSidebar>
  );
}

export default SideNavBar;
