import React, { useState, useEffect } from "react";
import "./styles/postform.css";
import firebase from "firebase";
import uniqid from "uniqid";

const PostForm = (props) => {
  const [postTitle, setPostTitle] = useState("");
  const [postDescription, setPostDescription] = useState("");
  const [postAuthor, setPostAuthor] = useState(props.userName);

  const getTitle = (e) => {
    setPostTitle(e.target.value);
  };

  const getDescrition = (e) => {
    setPostDescription(e.target.value);
  };

  //creates a new doc in the database with the passed info
  const createPost = (e) => {
    e.preventDefault();
    if (props.logged) {
      firebase
        .firestore()
        .collection("posts")
        .add({
          author: postAuthor,
          title: postTitle,
          description: postDescription,
          comments: [],
          upvotes: 0,
          msgs: 0,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          id: uniqid(),
        })
        //hides the form
        .then(props.setShowForm(false))
        .catch((error) => console.log("error"));
    }
  };

  return (
    <form action="" className="create-post-form">
      <input
        onChange={getTitle}
        type="text"
        name=""
        id=""
        value={postTitle}
        placeholder="Post title"
        className="browser-default form-title"
      />
      <textarea
        onChange={getDescrition}
        value={postDescription}
        cols="30"
        rows="10"
        placeholder="Whats going on ?"
        className="form-description"
      ></textarea>
      <button onClick={createPost} className="form-button">
        Create Post
      </button>
    </form>
  );
};

export default PostForm;
