import React from 'react'
import NavBar from '../components/NavBar'
import HomePage from './HomePage'
import AboutPage from './AboutPage'
import ContactPage from './ContactPage'
import { Outlet } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div>
      <NavBar/>
      <Outlet/>
    </div>
  )
}

export default LandingPage