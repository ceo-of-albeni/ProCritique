import React from "react";
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import "./navbar.css";
import { useNavigate } from "react-router-dom";

const Navabr = () => {
  const navigate = useNavigate()
  return (
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
            <div className="login_btn">
              <div>LOGIN</div>
            </div>
          ) : (
            <div className="login_btn">
              <div>LOGOUT</div>
            </div>
          )}
          <div className="login_btn">
              <div>REGISTRATION</div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Navabr;
