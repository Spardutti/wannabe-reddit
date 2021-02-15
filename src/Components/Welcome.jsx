import React from "react";
import "./styles/cards.css";

const Welcome = () => {
  return (
    <div className="card-container">
      <h4 className="card-title">Welcome</h4>
      <p className="description">
              Thanks for visiting this site.
               In order to create a post or make comments
              you need to log in
      </p>
      
    </div>
  );
};

export default Welcome;
