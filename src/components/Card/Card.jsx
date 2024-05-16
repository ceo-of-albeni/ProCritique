import React from "react";
import classes from "./card.css";
import { useNavigate } from "react-router-dom";
import Rating from '@mui/material/Rating';
import { useState } from "react";

const Card = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState(2);

  return (
    <div className="card_main-div">
      <h3>Автохимия Dr.Active Антидождь для стекол "ANTIRAIN"</h3>
      <div className="card_imgcomm-div">
        <img src="https://i.pinimg.com/736x/b6/a6/d5/b6a6d50de7eb36065b98ebd254d46cd5.jpg" alt="" />
        <div className="card_starcomm-div">
          <div className="card_ratings">
            <Rating
              name="simple-controlled"
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            />
            <p>Среднее: 5</p>
            <a href="/">Читать все отзывы</a>
          </div>
          <div id="card_comment-div">
            <p id="card_comment-p">Безопасней снотворного, эффект накопительный. Как я победила бессонницу дозой?</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
