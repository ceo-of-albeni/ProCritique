import React, { useState, useContext, useEffect } from "react";
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import { authContext } from "../../contexts/authContext"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


const Navabr = () => {
  const [activeModal, setActiveModal] = useState("login");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { handleLogin, setError } = useContext(authContext);

  const closeModal = () => {
    setActiveModal(null);
  };

  const openLoginModal = () => {
    if (activeModal === null) {
      setActiveModal("login");
    }
  };

  function loginUser() {
    if (!email.trim() || !password.trim()) {
      alert("Some inputs are empty!");
      return;
    }

    let newObj = {
      email: email,
      password: password,
    };

    handleLogin(newObj, email, closeModal);
    console.log(newObj);

    setEmail("");
    setPassword("");
  }

  const handleLoginClick = e => {
    e.stopPropagation();
  };

  const handleOutsideClick = () => {
    closeModal();
    console.log("Closing modal");
  };

  const openReg = () => {
    navigate("/register");
    closeModal();
  }

  useEffect(() => {
    setError(false);
  }, []);


  const navigate = useNavigate()
  return (
    <>
        {activeModal === "login" && (
        <div className="login" onClick={handleOutsideClick}>
          <div className="login__inner" onClick={handleLoginClick}>
            {/* <img src="" alt="back" onClick={() => closeModal()} /> */}
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
              <button onClick={loginUser}>Sign In</button>
              <div className="login__signup" onClick={openReg}>
                <a href="javascript:void(0);" className="sign">
                  Sign Up
                </a>
              </div>
              {/* <div className={classes.login__fpassword} onClick={openForg}>
                <a href="javascript:void(0);">{t('login.forgot_pw')}</a>
              </div> */}
            </form>
          </div>
        </div>
      )}


<div className="header_navbar" style={{"backgroundColor" : "#6A5ACD"}}>
      <div className="container_header">
          <p className="logo_p" onClick={() => navigate("/")}>ProCritique</p>

        <div className="header_inner">   
        <InputBase
        sx={{ ml: 1, flex: 1 }}
        style={{"color": "white"}}
        placeholder="Search..."
      />
        <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon style={{"color": "white"}} />
      </IconButton>

          {localStorage.getItem("email") === null ? (
            <div className="login_btn" onClick={openLoginModal}>
              <div>LOGIN</div>
            </div>
          ) : (
            <div className="login_btn">
              <div>LOGOUT</div>
            </div>
          )}
          {/* <div className="login_btn">
              <div>REGISTRATION</div>
          </div> */}
        </div>
      </div>
    </div>
    </>
  );
};

export default Navabr;
