import React from "react";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="home_main">
      <div className="home_container">
        <section className="home_section">
          <div className="home_text">
            <h1>Welcome to ProCritique</h1>
            <p>
              ProCritique is your ultimate destination for finding and reviewing the best programming courses available online. Our mission is to connect learners with top-quality courses and provide honest, detailed reviews to help you make informed decisions about your education.
            </p>
          </div>
        </section>

        <section className="home_section">
          <div className="home_text">
            <h1>Our Features</h1>
            <ul>
              <li>Comprehensive course reviews and ratings</li>
              <li>Detailed information about course content and instructors</li>
              <li>User-friendly search and filtering options</li>
              <li>Latest updates on new and trending courses</li>
              <li>Community feedback and comments</li>
            </ul>
          </div>
        </section>

        <section className="home_section">
          <div className="home_text">
            <h1>Join Our Community</h1>
            <p>
              At ProCritique, we believe in the power of community. Join our growing community of learners, share your experiences, and help others find the best programming courses. Whether you're a beginner or an experienced developer, ProCritique is here to support your learning journey.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
