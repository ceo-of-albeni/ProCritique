import React, { useState, useReducer } from "react";
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

const API = "http://localhost:3001/api";

const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState(false);

  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  const navigate = useNavigate();

  async function getUsers() {
    try {
      const res = await axios(`${API}/user`);
      dispatch({
        type: "GET_USERS",
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  }

  async function getOneUser() {
    try {
      const tokens = JSON.parse(localStorage.getItem("tokens"));
      const Authorization = `Bearer ${tokens.access_token}`;
      const config = {
        headers: {
          Authorization,
        },
      };
      const res = await axios(`${API}/user/get/profile`, config);
      dispatch({
        type: "GET_ONE_USER",
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  }

  async function handleRegister(newObj) {
    try {
      const res = await axios.post(`${API}/auth/register`, newObj);
      // navigate("/profile");
    } catch (err) {
      console.log(err);
      setError(err);
    } finally {
    }
  }

  async function handleLogin(formData, email, closeModal) {
    try {
      const res = await axios.post(`${API}/auth/login`, formData);
      setCurrentUser(res);
      localStorage.setItem("tokens", JSON.stringify(res.data));
      localStorage.setItem("email", email);

      closeModal();

      navigate("/");
      window.location.reload();
    } catch (err) {
      console.log(err);
      setError(err);
      alert("You entered wrong password or email!");
    } finally {
    }
  }

  async function handleConfirm(formData) {
    try {
      const res = await axios.post(`${API}/auth/confirmEmail`, formData);
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(err);
    }
  }

  async function sendCodeAgain(formData) {
    try {
      const res = await axios.patch(`${API}/auth/sendCodeAgain`, formData);
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(err);
    }
  }

  async function forgotPassword(email) {
    try {
      const res = await axios.post(`${API}/auth/forgotPassword`, email);
    } catch (err) {
      console.log(err);
      setError(err);
    } finally {
    }
  }

  async function handleUser(newProduct, navigate) {
    try {
      const tokens = JSON.parse(localStorage.getItem("tokens"));
      const Authorization = `Bearer ${tokens.access_token}`;
      const config = {
        headers: {
          Authorization,
        },
      };
      const res = await axios.post(`${API}/user-profile/`, newProduct, config);
    } catch (err) {
      console.log(err);
    }
  }

  function handleLogout() {
    localStorage.removeItem("tokens");
    localStorage.removeItem("email");
    setCurrentUser(false);
    navigate("/");
  }

  return (
    <authContext.Provider
      value={{
        currentUser,
        error,
        users: state.users,
        oneUser: state.oneUser,

        handleRegister,
        handleConfirm,
        setError,
        handleLogin,
        getOneUser,
        getUsers,
        handleLogout,
        handleUser,
        sendCodeAgain,
        forgotPassword,
      }}>
      {children}
    </authContext.Provider>
  );
};

export default AuthContextProvider;
