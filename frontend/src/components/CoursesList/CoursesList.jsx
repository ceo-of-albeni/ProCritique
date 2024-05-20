import React, { useEffect, useContext, useState } from "react";
import { useSearchParams, useParams } from "react-router-dom";
import { coursesContext } from "../../contexts/coursesContext";
import Card from "../Card/Card";
import Pagination from "@mui/material/Pagination";
import "./courseslist.css";

const CoursesList = ({ category }) => {
  const {
    getAllCourses,
    courses,
    getPhoto,
    photo,
    coursesByCategory,
    getCoursesByCategory,
  } = useContext(coursesContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(1);

  useEffect(() => {
    getCoursesByCategory(category);
    console.log(category);
  }, []);

  console.log(coursesByCategory);

  const itemsOnPage = 4;

  const count = Math.ceil(coursesByCategory.length / itemsOnPage);

  const handlePage = (e, p) => {
    setPage(p);
  };

  function currentData() {
    const begin = (page - 1) * itemsOnPage;
    const end = begin + itemsOnPage;
    return coursesByCategory.slice(begin, end);
  }

  useEffect(() => {
    getCoursesByCategory(category);
    getPhoto();
  }, []);

  useEffect(() => {
    getCoursesByCategory(category);
  }, [searchParams]);

  return (
    <div>
      <div className="list_main-div">
        <h1>Courses</h1>
        <div className="list_sort-div">
          <p>Сортировать: </p>
          <button className="sort_btn">по рейтингу</button>
          <button className="sort_btn">по умолчанию</button>
        </div>

        <div className="list_courses-div">
          {coursesByCategory ? (
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
    </div>
  );
};

export default CoursesList;
