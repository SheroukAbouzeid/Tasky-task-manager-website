import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import LogIn from './pages/LogIn';
import Register from './pages/Register';
import Home from './pages/Home';
import InProgress from './pages/InProgress';
import Completed from './pages/Completed';
import Tasks from './pages/Tasks';
import TaskDetails from './pages/TaskDetails';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />}>
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="login" element={<LogIn />} />
            <Route path="register" element={<Register />} />
          </Route>
          <Route path="/home" element={<Home />} />
          <Route path="inProgress" element={<InProgress />} />
          <Route path="completed" element={<Completed />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="taskdetails/:id" element={<TaskDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
