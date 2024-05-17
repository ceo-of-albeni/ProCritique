import React from 'react'
import HomePage from './pages/HomePage/HomePage'
import Navbar from './components/Navbar/Navbar'
import UnderNavbar from './components/UnderNavbar/UnderNavbar'
import Routing from './Routing'
import Card from './components/Card/Card'

const App = () => {
  return (
    <>
      <Navbar />
      <UnderNavbar />
      {/* <Card /> */}
      <Routing />
    </>
  )
}

export default App