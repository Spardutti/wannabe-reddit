import React from "react";
import "./styles/cards.css";

const Cards = () => {
  return (
    <div className="card-container">
      <h4 className="card-title">Title</h4>
      <p className="description">
        
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam
        cupiditate iste accusantium odit nemo dolorem reprehenderit dicta quae!
        Deserunt, eveniet omnis fugiat 
      </p>
      <div className="bottom-bar">
        <div className="upvote">
          <i class="fas fa-arrow-up"></i>
        </div>
        <div className="downvote">
          <i class="fas fa-arrow-down"></i>
        </div>
              <div className="comments">3</div>
              <div className="votes">10</div>
      </div>
    </div>
  );
};

export default Cards;
