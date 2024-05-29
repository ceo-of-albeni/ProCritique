import React, { useEffect, useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { coursesContext } from "../../contexts/coursesContext";
import Card from "../Card/Card";
import Pagination from "@mui/material/Pagination";
import "./courseslist.css";

const CoursesList = ({ category }) => {
  const { getPhoto, photo, coursesByCategory, getCoursesByCategory } = useContext(coursesContext);
  const [searchParams] = useSearchParams();
  const [page, setPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("default"); // Состояние для сортировки
  const [sortedCourses, setSortedCourses] = useState([]);

  useEffect(() => {
    getCoursesByCategory(category).then(() => {
      setSortedCourses(coursesByCategory);
    });
  }, [category, getCoursesByCategory]);

  useEffect(() => {
    getPhoto();
  }, [getPhoto]);

  useEffect(() => {
    let sorted = [...coursesByCategory];
    if (sortOrder === "asc") {
      sorted.sort((a, b) => a.common_rate - b.common_rate);
    } else if (sortOrder === "desc") {
      sorted.sort((a, b) => b.common_rate - a.common_rate);
    }
    setSortedCourses(sorted);
  }, [sortOrder, coursesByCategory]);

  const itemsOnPage = 4;
  const count = Math.ceil(sortedCourses.length / itemsOnPage);

  const handlePage = (e, p) => {
    setPage(p);
  };

  const handleSort = (order) => {
    setSortOrder(order);
  };

  const currentData = () => {
    const begin = (page - 1) * itemsOnPage;
    const end = begin + itemsOnPage;
    return sortedCourses.slice(begin, end);
  };

  return (
    <div>
      <div className="list_main-div">
        <h1>Courses</h1>
        <div className="list_sort-div">
          <p>Сортировать: </p>
          <button className="sort_btn" onClick={() => handleSort("asc")}>по рейтингу возрастанию</button>
          <button className="sort_btn" onClick={() => handleSort("desc")}>по рейтингу убыванию</button>
        </div>

        <div className="list_courses-div">
          {sortedCourses.length > 0 ? (
            currentData().map((item) => <Card key={item.id} item={item} />)
          ) : (
            <h3>Loading...</h3>
          )}
        </div>

        <Pagination
          count={count}
          page={page}
          onChange={handlePage}
        />
      </div>
    </div>
  );
};

export default CoursesList;
