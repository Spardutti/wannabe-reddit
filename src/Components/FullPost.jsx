import React from "react";
import "./styles/fullcard.css";

const FullPost = (props) => {
  return (
    <div className="full-card-container">
      <div>
        <p onClick={props.hidePost} className="full-card-arrow">
          <i class="fas fa-arrow-left"></i>
        </p>
        <h4 className="full-card-title">{props.title}</h4>
      </div>
      <p className="full-card-author">
        Created by {props.author} @ {props.time}
      </p>
      <div className="full-card-description">{props.description}</div>
      <div className="full-card-bottom-bar">
        <div className="upvote">
          <i class="fas fa-arrow-up"></i>
        </div>
        <div className="votes">10</div>

        <div className="downvote">
          <i class="fas fa-arrow-down"></i>
        </div>
        <div className="comments">3</div>
          </div>
          <div className="full-card-comment-bar">
           <input type="text" className="full-card-comment browser-default" placeholder="enter comment"/>
          <button>Add</button>
          </div>
    </div>
  );
};

export default FullPost;
