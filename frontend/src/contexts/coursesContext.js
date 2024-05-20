import React, { useReducer } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export const coursesContext = React.createContext();

const INIT_STATE = {
  courses: [],
  oneCourse: [],
  photo: [],
};

function reducer(state = INIT_STATE, action) {
  switch (action.type) {
    case "GET_COURSES":
      return { ...state, courses: action.payload };
    case "GET_ONE_COURSE":
      return { ...state, oneCourse: action.payload };
    case "GET_PHOTO":
      return { ...state, photo: action.payload };
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

  return (
    <coursesContext.Provider
      value={{
        courses: state.courses,
        oneCourse: state.oneCourse,
        photo: state.photo,

        getAllCourses,
        getAllCourses,
        fetchByParams,
        getPhoto,
      }}>
      {children}
    </coursesContext.Provider>
  );
};

export default CoursesContextsProvider;