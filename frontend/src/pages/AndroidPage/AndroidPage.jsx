import classes from "./androidpage.module.css";
import React, { useContext, useEffect, useState } from "react";
import Card from "../../components/Card/Card";
import Pagination from "@mui/material/Pagination";
import { useSearchParams } from "react-router-dom";
import CoursesList from "../../components/CoursesList/CoursesList";

const AndroidPage = () => {
  return (
    <div>
      <CoursesList category="Android-разработка" />
    </div>
  );
};

export default AndroidPage;
