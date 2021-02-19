import React from "react";
import "./styles/comments.css"

const Comments = (props) => {
  return (
    <div className="comment-container">
          <p>Created by: {props.author}</p>
          <p className="comment-msg">{props.msg}</p>

    </div>
  );
};

export default Comments;
