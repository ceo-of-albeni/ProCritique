import React, { useState, useReducer, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const authContext = React.createContext();

const INIT_STATE = {
  users: [],
  oneUser: [],
};

function reducer(state = INIT_STATE, action) {
  switch (action.type) {
    case "GET_USERS":
      return { ...state, users: action.payload };
    case "GET_ONE_USER":
      return { ...state, oneUser: action.payload };
    default:
      return state;
  }
}

const API = "http://localhost:3001/tutorial/";

const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState(false);

  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  const navigate = useNavigate();

  useEffect(() => {
    const email = localStorage.getItem("email");
    const username = localStorage.getItem("username");
    if (email && username) {
      setCurrentUser({ email, username });
    }
  }, []);

  async function handleRegister(newObj) {
    try {
      const res = await axios.post(`${API}createUser`, newObj);
      console.log('User created:', res.data);
    } catch (err) {
      setError(true);
      console.error('Error creating user:', err);
    }
  }

  async function handleLogin(formData) {
    try {
      const res = await axios.post(`${API}login`, formData);
      const { idToken, email, username } = res.data;

      setCurrentUser({ email, username });
      localStorage.setItem("idToken", idToken);
      localStorage.setItem("email", email);
      localStorage.setItem("username", username);
      setError(false);
    } catch (err) {
      setError(true);
      console.error('Error logging in user:', err);
      alert("Invalid email or password!");
    }
  }

  async function getAllUsers() {
    try {
      const res = await axios.get(`${API}getAllUsers`);
      dispatch({
        type: "GET_USERS",
        payload: res.data,
      });
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  }

  async function getOneUser(userId) {
    try {
      const res = await axios.get(`${API}getUser/${userId}`);
      dispatch({
        type: "GET_ONE_USER",
        payload: res.data,
      });
    } catch (err) {
      console.error('Error fetching user:', err);
    }
  }

  function handleLogout() {
    localStorage.removeItem("idToken");
    localStorage.removeItem("email");
    localStorage.removeItem("username");
    setCurrentUser(null);
    navigate("/");
    window.location.reload();
  }

  return (
    <authContext.Provider
      value={{
        currentUser,
        error,
        handleRegister,
        handleLogin,
        handleLogout,
        getAllUsers,
        getOneUser,
        users: state.users,
        oneUser: state.oneUser,
        setError,
      }}>
      {children}
    </authContext.Provider>
  );
};

export default AuthContextProvider;
