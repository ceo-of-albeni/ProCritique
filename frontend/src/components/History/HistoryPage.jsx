import './HistoryPage.css';
import React, { useContext, useEffect, useState } from 'react';
import { authContext } from '../../contexts/authContext';
import { coursesContext } from '../../contexts/coursesContext';

const HistoryPage = () => {
  const { currentUser } = useContext(authContext);
  const { getUserComments } = useContext(coursesContext);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserComments = async () => {
      setLoading(true);
      try {
        if (currentUser) {
          const response = await fetch(`http://localhost:3001/tutorial/getUserComments/${currentUser.id}`);
          const userComments = await response.json();
          setComments(userComments);
        }
      } catch (error) {
        console.error('Error fetching user comments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserComments();
  }, [currentUser]);

  return (
    <div className="history-page">
      <h1>Comment History</h1>
      {loading ? (
        <div className="loader">Loading...</div>
      ) : (
        comments.length > 0 ? (
          <ul className="comment-list">
            {comments.map((comment, index) => (
              <li key={index} className="comment-item">
                <h3>{comment.courseName}</h3>
                <div className="comment-detail">
                  <span className="rating">Rating: {comment.rating}</span>
                  <p>{comment.review}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No comments found.</p>
        )
      )}
    </div>
  );
};

export default HistoryPage;
