import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import AndroidPage from "./pages/AndroidPage/AndroidPage";
import BackPage from "./pages/BackPage/BackPage";
import FrontPage from "./pages/FrontPage/FrontPage";
import FullStackPage from "./pages/FullStackPage/FullStackPage";
import IOS from "./pages/IOS/IOS";
import UXUI from "./pages/UXUi/UXUI";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";
import Detailed from "./components/Detailed/Detailed";

const Routing = () => {
  const PUBLIC_ROUTES = [
    {
      link: "/",
      element: <HomePage />,
      id: 1,
    },
    {
      link: "/courses/android",
      element: <AndroidPage />,
      id: 2,
    },
    {
      link: "/courses/backend",
      element: <BackPage />,
      id: 3,
    },
    {
      link: "/courses/frontend",
      element: <FrontPage />,
      id: 4,
    },
    {
      link: "/courses/fullstack",
      element: <FullStackPage />,
      id: 5,
    },
    {
      link: "/courses/frontend",
      element: <FrontPage />,
      id: 6,
    },
    {
      link: "/courses/ios",
      element: <IOS />,
      id: 7,
    },
    {
      link: "/courses/uxui",
      element: <UXUI />,
      id: 8,
    },
    {
      link: "/register",
      element: <RegistrationPage />,
      id: 9,
    },
    {
      link: "/courses/:id",
      element: <Detailed />,
      id: 10,
    },
  ];
  return (
    <Routes>
      {PUBLIC_ROUTES.map((item) => (
        <Route path={item.link} element={item.element} key={item.id} />
      ))}
    </Routes>
  );
};

export default Routing;
