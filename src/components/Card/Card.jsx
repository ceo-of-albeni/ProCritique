import React from "react";
import classes from "./card.css";
import { useNavigate } from "react-router-dom";

const Card = () => {
  const navigate = useNavigate();

  return (
    <div className="card_main-div">
      <h3>Автохимия Dr.Active Антидождь для стекол "ANTIRAIN"</h3>
      <div className="card_imgcomm-div">
        <img width="150" src="https://i.pinimg.com/736x/b6/a6/d5/b6a6d50de7eb36065b98ebd254d46cd5.jpg" alt="" />
        <div className="card_starcomm-div">
          <p>Stars</p>
          <p id="card_comment">Comment</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
