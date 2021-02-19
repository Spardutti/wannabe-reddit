import React, { useState, useEffect } from "react";
import "./styles/cards.css";
import firebase from "firebase";

const Cards = (props) => {
  const [votesCount, setVotesCount] = useState(props.upvotes);

  //add a upvote
  const upvote = (e) => {
    let id = e.target.parentNode.parentNode.id;
    setVotesCount(votesCount + 1);
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
          setVotesCount(data.data().upvotes)
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

  const listenForChanges = (id) => {
    firebase
      .firestore()
      .collection("posts")
      .where("id", "==", id)
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "modified") {
            setVotesCount(change.doc.data().upvotes);
          }
        });
      });
  };

  return (
    <div className="card-container" id={props.id}>
      <div onClick={props.openPost}>
        <h4 className="card-title">{props.title}</h4>
        <p className="author">
          Created by: {props.author} {props.time}
        </p>
        <div className="description">{props.description}</div>
      </div>
      <div className="bottom-bar">
        <i class="fas fa-arrow-up upvote" onClick={upvote}></i>

        <div className="votes">{votesCount}</div>
        <i class="fas fa-arrow-down downvote" onClick={downVote}></i>
      </div>
    </div>
  );
};

export default Cards;
