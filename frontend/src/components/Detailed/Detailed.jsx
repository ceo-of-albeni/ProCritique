import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { coursesContext } from "../../contexts/coursesContext";
import "./detailed.css";
import Rating from "@mui/material/Rating";

const Detailed = () => {
  const { getOneCourse, oneCourse } = useContext(coursesContext);
  const [value, setValue] = React.useState(0);

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    getOneCourse(id);
  }, []);

  return (
    <div id="detailed_maindiv">
      {oneCourse ? (
        <div className="detailed_main">
          <div className="detailed_photo-maininfo">
            <img src={oneCourse.url} alt="" />
            <div className="detailed_maininfo">
              <h1>{oneCourse.course_name}</h1>
              <Rating
                name="simple-controlled"
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
              />
              <p>{oneCourse.cost}</p>
              <p>{oneCourse.detailed_description}</p>
            </div>
          </div>
          <div className="detailed_contacts">
            {oneCourse.contacts.map((item) => (
              <div key={item.id} className="details_contact">
                <p>Address: {item.address}</p>
                <p>City: {item.city}</p>
                <p>Email: {item.email}</p>
                <p>Phone: {item.phone_numbers}</p>
              </div>
            ))}
          </div>
          <div className="detailed_mentors-teachers">
            <div className="detailed_mentors">
              <h3>Mentors:</h3>
              {oneCourse.mentors.map((item) => (
                <div key={item.id}>
                  <p>{item.name}</p>
                  <p>{item.position}</p>
                  <p>{item.experience}</p>
                  <p>{item.education}</p>
                </div>
              ))}
            </div>
            <div className="detailed_teachers">
              <h3>Teachers:</h3>
              {oneCourse.teachers.map((item) => (
                <div key={item.id}>
                  <p>{item.name}</p>
                  <p>{item.position}</p>
                  <p>{item.experience}</p>
                  <p>{item.education}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <p></p>
      )}
    </div>
  );
};

export default Detailed;
