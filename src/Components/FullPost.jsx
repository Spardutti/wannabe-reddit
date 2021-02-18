import React, { useState, useEffect } from "react";
import "./styles/fullcard.css";
import firebase from "firebase";

const FullPost = (props) => {
  const [newComment, setNewComment] = useState();
  const [userName, setUserName] = useState(props.userName);

  const addMessage = (e) => {
    if (!props.logged) {
      alert("Please log in to add comments");
    } else {
      let id = e.target.parentNode.parentNode.parentNode.id;
      firebase
        .firestore()
        .collection("posts")
        .where("id", "==", id)
        .get()
        .then((snapshot) => {
          snapshot.forEach((e) => {
            e.ref.update({
              comments: firebase.firestore.FieldValue.arrayUnion({
                author: userName,
                msg: newComment,
              }),
            });
            setNewComment("");
          });
        });
    }
  };

  const getComment = (e) => {
    setNewComment(e.target.value);
  };

  return (
    <div className="full-card-container" id={props.id}>
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
        <textarea
          value={newComment}
          onChange={getComment}
          rows="100"
          type="text"
          className="full-card-comment browser-default"
          placeholder="enter comment"
        />
        <button onClick={addMessage} className="add-comment">
          <i class="far fa-paper-plane"></i>
        </button>
      </div>
    </div>
  );
};

export default FullPost;
