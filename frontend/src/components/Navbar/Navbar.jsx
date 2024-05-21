import React, { useState, useContext, useEffect } from "react";
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import { authContext } from "../../contexts/authContext";
import { coursesContext } from "../../contexts/coursesContext";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Navbar = () => {
  const [activeModal, setActiveModal] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { handleLogin, handleLogout, currentUser, setError } = useContext(authContext);
  const { searchCourses } = useContext(coursesContext);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const closeModal = () => {
    setActiveModal(null);
  };

  const openLoginModal = () => {
    if (activeModal === null) {
      setActiveModal("login");
    }
  };

  const loginUser = async () => {
    if (!email.trim() || !password.trim()) {
      alert("Some inputs are empty!");
      return;
    }

    let newObj = {
      email: email,
      password: password,
    };

    try {
      console.log('Sending login request:', newObj);
      await handleLogin(newObj);
      alert("Login successful!");
      closeModal();
      navigate("/");
    } catch (error) {
      console.log('Login error:', error);
      alert("Invalid email or password");
    }

    setEmail("");
    setPassword("");
  };

  const handleLoginClick = (e) => {
    e.stopPropagation();
  };

  const handleOutsideClick = () => {
    closeModal();
    console.log("Closing modal");
  };

  const openReg = () => {
    navigate("/register");
    closeModal();
  };

  const handleSearch = () => {
    searchCourses(searchQuery);
  };

  useEffect(() => {
    if (setError) setError(false);
  }, [setError]);

  useEffect(() => {
    console.log('Current User:', currentUser);
  }, [currentUser]);

  return (
    <>
      {activeModal === "login" && (
        <div className="login" onClick={handleOutsideClick}>
          <div className="login__inner" onClick={handleLoginClick}>
            <ArrowBackIcon className="arrowimg" onClick={() => closeModal()} />
            <form>
              <div>LOGIN</div>
              <label>Email</label>
              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                name="email"
              />
              <label>Password</label>
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="button" onClick={loginUser}>Sign In</button>
              <div className="login__signup" onClick={openReg}>
                <a href="javascript:void(0);" className="sign">
                  Sign Up
                </a>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="header_navbar" style={{ backgroundColor: "#6A5ACD" }}>
        <div className="container_header">
          <p className="logo_p" onClick={() => navigate("/")}>ProCritique</p>
          <div className="header_inner">
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              style={{ color: "white" }}
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={handleSearch}>
              <SearchIcon style={{ color: "white" }} />
            </IconButton>
            {currentUser ? (
              <>
                <div className="user_name">{currentUser.username}</div>
                <div className="login_btn" onClick={handleLogout}>
                  <div>LOGOUT</div>
                </div>
              </>
            ) : (
              <div className="login_btn" onClick={openLoginModal}>
                <div>LOGIN</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
