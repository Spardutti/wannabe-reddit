import React from "react";
import "./styles/cards.css";

const Cards = (props) => {


  return (
    <div className="card-container" onClick={props.openPost} id={props.id}>
      <h4 className="card-title">{props.title}</h4>
      <p className="author">Created by: {props.author} {props.time}</p>
      <div className="description">
        
        {props.description}
      </div>
      <div className="bottom-bar">
        <div className="upvote">
          <i class="fas fa-arrow-up"></i>
        </div>
        <div className="votes">10</div>
        <div className="downvote">
          <i class="fas fa-arrow-down"></i>
        </div>
              <div className="comments">3</div>
      </div>
    </div>
  );
};

export default Cards;
