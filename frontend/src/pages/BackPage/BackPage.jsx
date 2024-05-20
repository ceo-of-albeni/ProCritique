import classes from "./backpage.module.css";
import React, { useContext, useEffect, useState } from "react";
import CoursesList from "../../components/CoursesList/CoursesList";

const BackPage = () => {
  return (
    <div>
      <CoursesList category="Backend" />
    </div>
  );
};

export default BackPage;
