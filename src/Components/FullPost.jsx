import React, { useState, useEffect } from "react";
import "./styles/fullcard.css";
import firebase from "firebase";
import Comments from "./Comments";

const FullPost = (props) => {
  const [newComment, setNewComment] = useState();
  const [userName, setUserName] = useState(props.userName);
  const [votesCount, setVotesCount] = useState(props.upvotes);

  const addMessage = (e) => {
    if (props.logged && newComment) {
      //get the div id to get the same document
      let id = e.target.parentNode.parentNode.parentNode.id;
      firebase
        .firestore()
        .collection("posts")
        .where("id", "==", id)
        .get()
        .then((snapshot) => {
          snapshot.forEach((e) => {
            //update the comments field. adding to array with arrayUnion
            e.ref.update({
              comments: firebase.firestore.FieldValue.arrayUnion({
                author: userName,
                msg: newComment,
              }),
            });
            setNewComment("");
          });
        });
    } else {
      alert("Please log in or enter a message");
    }
  };

  const getCommentValue = (e) => {
    setNewComment(e.target.value);
  };

  //add a upvote
  const upvote = (e) => {
    let id = e.target.parentNode.parentNode.id;
    props.setVotes(props.upvotes + 1);
    listenForChanges(id);
    firebase
      .firestore()
      .collection("posts")
      .where("id", "==", id)
      .get()
      .then((snapshot) => {
        snapshot.forEach((data) => {
          //update the db
          data.ref.update({
            upvotes: data.data().upvotes + 1,
          });
        });
      });
  };
  // add a downvote
  const downVote = (e) => {
    let id = e.target.parentNode.parentNode.id;
    setVotesCount(votesCount - 1);

    listenForChanges(id);
    firebase
      .firestore()
      .collection("posts")
      .where("id", "==", id)
      .get()
      .then((snapshot) => {
        snapshot.forEach((data) => {
          //update the db
          data.ref.update({
            upvotes: data.data().upvotes - 1,
          });
        });
      });
  };

  const listenForChanges = () => {
    firebase
      .firestore()
      .collection("posts")
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "modified") {
            setVotesCount(change.doc.data().upvotes);
          }
        });
      });
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
        <i onClick={upvote} class="fas fa-arrow-up upvote"></i>

        <div className="votes">{props.upvotes}</div>

          <i onClick={downVote} class="fas fa-arrow-down downvote"></i>
      </div>
      {props.postComments.map((e) => {
        return <Comments author={e.author} msg={e.msg} />;
      })}
      <div className="full-card-comment-bar">
        <textarea
          value={newComment}
          onChange={getCommentValue}
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
