import React from 'react'
import NavBar from '../components/NavBar'
import HomePage from './HomePage'
import AboutPage from './AboutPage'
import ContactPage from './ContactPage'

const LandingPage = () => {
  return (
    <div>
      <NavBar/>
      <ContactPage/>
    </div>
  )
}

export default LandingPage