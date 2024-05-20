import React, { useEffect, useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { coursesContext } from "../../contexts/coursesContext";
import Card from "../Card/Card";
import Pagination from "@mui/material/Pagination";
import Footer from "../Footer/Footer";

const CoursesList = () => {
  const { getAllCourses, courses, getPhoto, photo } =
    useContext(coursesContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(1);

  const itemsOnPage = 4;

  const count = Math.ceil(courses.length / itemsOnPage);

  const handlePage = (e, p) => {
    setPage(p);
  };

  function currentData() {
    const begin = (page - 1) * itemsOnPage;
    const end = begin + itemsOnPage;
    return courses.slice(begin, end);
  }

  useEffect(() => {
    getAllCourses();
    getPhoto();
  }, []);

  useEffect(() => {
    getAllCourses();
  }, [searchParams]);

  return (
    <div>
      <div
        className="d-flex flex-column align-items-center mt-5"
        style={{ marginBottom: "100px" }}>
        <h2>Courses</h2>

        <div className="d-flex justify-content-center flex-wrap">
          {courses ? (
            currentData().map((item) => <Card key={item.id} item={item} />)
          ) : (
            <h3>Loading...</h3>
          )}
        </div>

        <Pagination
          count={count}
          page={page}
          photo={photo.url}
          onChange={handlePage}
        />
      </div>
      <Footer />
    </div>
  );
};

export default CoursesList;
