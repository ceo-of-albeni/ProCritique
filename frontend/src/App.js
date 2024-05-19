import React from "react";
import HomePage from "./pages/HomePage/HomePage";
import Navbar from "./components/Navbar/Navbar";
import UnderNavbar from "./components/UnderNavbar/UnderNavbar";
import Routing from "./Routing";
import Card from "./components/Card/Card";
import AuthContextProvider from "./contexts/authContext";
import Footer from "./components/Footer/Footer";

const App = () => {
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
