import React, { useReducer } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export const coursesContext = React.createContext();

const INIT_STATE = {
  courses: [],
  oneCourse: [],
  photo: [],
  coursesByCategory: [],
};

function reducer(state = INIT_STATE, action) {
  switch (action.type) {
    case "GET_COURSES":
      return { ...state, courses: action.payload };
    case "GET_ONE_COURSE":
      return { ...state, oneCourse: action.payload };
    case "GET_PHOTO":
      return { ...state, photo: action.payload };
    case "GET_COURSES_BY_CATEGORY":
      return { ...state, coursesByCategory: action.payload };
    case "SEARCH_COURSES":
      return { ...state, courses: action.payload };
    default:
      return state;
  }
}

const CoursesContextsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  const API = "http://localhost:3001";

  const location = useLocation();
  const navigate = useNavigate();

  async function getAllCourses() {
    try {
      const res = await axios(`${API}/tutorial/getAllCourses`);
      dispatch({
        type: "GET_COURSES",
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  }

  async function searchCourses(query) {
    try {
      const res = await axios(`${API}/tutorial/getAllCourses`);
      const filteredCourses = res.data.filter(course => 
        course.course_name.toLowerCase().includes(query.toLowerCase())
      );
      dispatch({
        type: "SEARCH_COURSES",
        payload: filteredCourses,
      });
    } catch (err) {
      console.log(err);
    }
  }

  async function getCoursesByCategory(name) {
    try {
      const res = await axios(
        `http://localhost:3001/tutorial/getCoursesByCategory?category=${name}`
      );
      dispatch({
        type: "GET_COURSES_BY_CATEGORY",
        payload: res.data,
      });
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }

  async function getOneCourse(id) {
    try {
      const res = await axios(`${API}/tutorial/getCourse/${id}`);
      dispatch({
        type: "GET_ONE_COURSE",
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  }

  async function getPhoto(name) {
    try {
      const res = await axios(`${API}/tutorial/file/${name}.ico`);
      dispatch({
        type: "GET_PHOTO",
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  }

  const fetchByParams = (query, value) => {
    const search = new URLSearchParams(location.search);

    if (value === "articles") {
      search.delete(query);
    } else {
      search.set(query, value);
    }

    const url = `${location.pathname}?${search.toString()}`;

    navigate(url);
  };

  const addCommentToCourse = async (courseId, newComment) => {
    try {
      await axios.post(`${API}/tutorial/addComment/${courseId}`, newComment);
      getOneCourse(courseId);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteCommentFromCourse = async (courseId, commentId) => {
    try {
      await axios.post(`${API}/tutorial/deleteComment/${courseId}/${commentId}`);
      getOneCourse(courseId);
    } catch (err) {
      console.log(err);
    }
  };

  const updateComment = async (courseId, commentId, updatedComment) => {
    try {
      await axios.post(`${API}/tutorial/updateComment/${courseId}/${commentId}`, updatedComment);
      getOneCourse(courseId);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <coursesContext.Provider
      value={{
        courses: state.courses,
        oneCourse: state.oneCourse,
        photo: state.photo,
        coursesByCategory: state.coursesByCategory,

        getAllCourses,
        getOneCourse,
        fetchByParams,
        getPhoto,
        getCoursesByCategory,
        searchCourses,
        addCommentToCourse,
        deleteCommentFromCourse,
        updateComment,
      }}>
      {children}
    </coursesContext.Provider>
  );
};

export default CoursesContextsProvider;
