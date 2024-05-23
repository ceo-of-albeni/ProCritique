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
    const userId = localStorage.getItem("userId");
    if (email && username && userId) {
      setCurrentUser({ id: userId, email, username });
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
      const { idToken, email, username, userId } = res.data;

      console.log('Login response:', res.data);

      setCurrentUser({ id: userId, email, username });
      localStorage.setItem("idToken", idToken);
      localStorage.setItem("email", email);
      localStorage.setItem("username", username);
      localStorage.setItem("userId", userId);
      setError(false);
    } catch (err) {
      setError(true);
      console.error('Error logging in user:', err);
      alert("Invalid email or password!");
    }
  }

  function handleLogout() {
    localStorage.removeItem("idToken");
    localStorage.removeItem("email");
    localStorage.removeItem("username");
    localStorage.removeItem("userId");
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
        setError,
      }}>
      {children}
    </authContext.Provider>
  );
};

export default AuthContextProvider;
