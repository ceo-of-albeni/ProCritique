import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { coursesContext } from "../../contexts/coursesContext";
import { authContext } from "../../contexts/authContext";
import Rating from "@mui/material/Rating";
import IconButton from '@mui/material/IconButton'; 
import EditIcon from '@mui/icons-material/Edit'; 
import DeleteIcon from '@mui/icons-material/Delete'; 
import "./detailed.css";
  
const Detailed = () => {
  const { getOneCourse, oneCourse, addCommentToCourse, deleteCommentFromCourse, updateCommentInCourse } = useContext(coursesContext);
  const { currentUser } = useContext(authContext);
  const [value, setValue] = useState(0);
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const [editingComment, setEditingComment] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    getOneCourse(id);
  }, [id, getOneCourse]);

  useEffect(() => {
    if (oneCourse && oneCourse.common_rate) {
      setValue(parseFloat(oneCourse.common_rate));
    }
  }, [oneCourse]);

  const handleAddComment = async () => {
    if (currentUser && comment) {
      const newComment = {
        userId: currentUser.id,
        username: currentUser.username,
        review: comment,
        rating: rating,
      };
      try {
        await addCommentToCourse(id, newComment); 
        setComment('');
        setRating(0);
        getOneCourse(id);
      } catch (error) {
        console.error('Error adding comment:', error);
      }
    } else {
      alert("Please log in to leave a comment.");
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (currentUser) {
      try {
        await deleteCommentFromCourse(id, commentId, currentUser.id);
        getOneCourse(id);
      } catch (error) {
        console.error('Error deleting comment:', error);
      }
    } else {
      alert("Please log in to delete a comment.");
    }
  };

  const handleEditComment = (commentId, review, rating) => {
    setEditingComment(commentId);
    setComment(review);
    setRating(rating);
  };

  const handleUpdateComment = async () => {
    if (currentUser && editingComment) {
      const updatedComment = {
        review: comment,
        rating: rating,
      };
      try {
        await updateCommentInCourse(id, editingComment, updatedComment, currentUser.id);
        setEditingComment(null);
        setComment('');
        setRating(0);
        getOneCourse(id);
      } catch (error) {
        console.error('Error updating comment:', error);
      }
    } else {
      alert("Please log in to update a comment.");
    }
  };

  return (
    <div id="detailed_maindiv">
      {oneCourse ? (
        <div className="detailed_main">
          <div className="detailed_photo-maininfo">
            <img src={oneCourse.url} alt={oneCourse.course_name} />
            <div className="detailed_maininfo">
              <h1>{oneCourse.course_name}</h1>
              <div className="rating">
                <Rating
                  name="course-rating"
                  value={value}
                  precision={0.1}
                  readOnly
                />
              </div>
              <p className="cost">{oneCourse.cost}</p>
              <p>{oneCourse.detailed_description}</p>
              {oneCourse.link && (
                <p>
                  <strong>Course Link:</strong> <a href={oneCourse.link} target="_blank" rel="noopener noreferrer">{oneCourse.link}</a>
                </p>
              )}
            </div>
          </div>
          {oneCourse.contacts && (
            <div className="detailed_contacts">
              <h3>Contacts:</h3>
              {oneCourse.contacts.map((item, index) => (
                <div key={index} className="details_contact">
                  <p>Address: <a href={item.address} target="_blank" rel="noopener noreferrer">View on Map</a></p>
                  <p>City: {item.city}</p>
                  <p>Email: <a href={`mailto:${item.email}`}>{item.email}</a></p>
                  <p>Phone: {item.phone_numbers.join(", ")}</p>
                </div>
              ))}
            </div>
          )}
          <div className="detailed_mentors-teachers">
            {oneCourse.mentors && (
              <div className="detailed_mentors">
                <h3>Mentors:</h3>
                {oneCourse.mentors.map((item, index) => (
                  <div key={index} className="mentor_teacher_card">
                    <p><strong>Name:</strong> {item.name}</p>
                    <p><strong>Position:</strong> {item.position}</p>
                    <p><strong>Experience:</strong> {item.experience}</p>
                    <p><strong>Education:</strong> {item.education}</p>
                  </div>
                ))}
              </div>
            )}
            {oneCourse.teachers && (
              <div className="detailed_teachers">
                <h3>Teachers:</h3>
                {oneCourse.teachers.map((item, index) => (
                  <div key={index} className="mentor_teacher_card">
                    <p><strong>Name:</strong> {item.name}</p>
                    <p><strong>Position:</strong> {item.position}</p>
                    <p><strong>Experience:</strong> {item.experience}</p>
                    <p><strong>Education:</strong> {item.education}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
          {oneCourse.comments && (
            <div className="detailed_comments">
              <h3>Comments:</h3>
              {Object.entries(oneCourse.comments).map(([commentId, comment], index) => (
                <div key={index} className="comment_card">
                  <p><strong>{comment.username}</strong>:</p>
                  <Rating value={comment.rating} readOnly />
                  <p>{comment.review}</p>
                  {currentUser && currentUser.id === comment.userId && (
                    <div className="comment_actions">
                      <IconButton
                        aria-label="edit"
                        onClick={() => handleEditComment(commentId, comment.review, comment.rating)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        aria-label="delete"
                        onClick={() => handleDeleteComment(commentId)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
          {currentUser && (
            <div className="add_comment">
              <h3>{editingComment ? "Edit Your Comment" : "Leave a Comment"}:</h3>
              <Rating
                name="user-rating"
                value={rating}
                onChange={(event, newValue) => {
                  setRating(newValue);
                }}
              />
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write your comment here"
              />
              <button onClick={editingComment ? handleUpdateComment : handleAddComment}>
                {editingComment ? "Update" : "Submit"}
              </button>
            </div>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Detailed;
