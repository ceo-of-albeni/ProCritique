import React, { useEffect } from "react";
import classes from "./card.css";
import { useNavigate } from "react-router-dom";
import Rating from "@mui/material/Rating";

const Card = ({ item }) => {
  const navigate = useNavigate();

  return (
    <div className="card_main-div">
      <h3>{item.course_name}</h3>
      <div className="card_imgcomm-div">
        <img src={item.url} alt="" />
        <div className="card_starcomm-div">
          <div className="card_ratings">
            <Rating
              name="read-only"
              value={item.comments.comment2.rating}
              readOnly
            />
            <p>Среднее: {item.common_rate}</p>
            <a onClick={() => navigate(`/courses/${item.id}`)}>Перейти</a>
          </div>
          <div id="card_comment-div">
            <p id="card_comment-p">{item.short_description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
