import React, {useState, useEffect } from 'react'
import HomePage from "./pages/HomePage/HomePage";
import Navbar from "./components/Navbar/Navbar";
import UnderNavbar from "./components/UnderNavbar/UnderNavbar";
import Routing from "./Routing";
import Card from "./components/Card/Card";
import AuthContextProvider from "./contexts/authContext";
import Footer from "./components/Footer/Footer";
import { json } from 'react-router-dom'

const App = () => {

  const [data, setData] = useState(null) 

  // useEffect(() => {
  //   fetch('/api')
  //   .then((response) => response.json())
  //   .then(response => setData())
  // }, [])

  return (
    <>
      <AuthContextProvider>
        <Navbar />
        <UnderNavbar />
        <Routing />
        <Footer />
      </AuthContextProvider>
    </>
  );
};

export default App;
