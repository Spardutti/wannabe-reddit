import React from "react";
import "./styles/comments.css"

const Comments = (props) => {
  return (
    <div className="comment-container">
          <p>{props.author}</p>
          <p>{props.msg}</p>
      <div className="comment-bottom-bar">
        <div className="upvote">
          <i class="fas fa-arrow-up"></i>
        </div>
        <div className="votes">10</div>

        <div className="downvote">
          <i class="fas fa-arrow-down"></i>
        </div>
      </div>
    </div>
  );
};

export default Comments;
