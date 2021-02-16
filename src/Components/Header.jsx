import React, { useState, useEffect } from "react";
import "./styles/header.css";
import logo from "./images/WannabeRedditLogo.png";
import firebase from "firebase";

const Header = (props) => {
  const [firstLetter, setFirstLetter] = useState("");

  const getUserName = (e) => {
    props.setUserName(e.target.value);
  };

  const getUserLetter = () => {
    let name = props.userName;
    let letter = name[0].toUpperCase();
    setFirstLetter(letter);
  };

  const logIn = () => {
    if (props.userName !== "") {
      firebase
        .auth()
        .signInAnonymously()
        .then(() => {
          console.log("signed in", props.userName);
          getUserLetter();
          props.setLogged(true);
        })
        .catch((error) => console.error("cant log in" + error));
    } else {
      alert("please enter your user name");
    }
  };


  const displayForm = (e) => {
    e.preventDefault();
    if (props.logged) {
      props.setShowForm(true);
    } else {
      alert("Please log in before posting");
    }
  };

  return (
    <div className="header">
      <h3>Wannabe Reddit</h3>
      {props.logged ? (
        <div className="user">{firstLetter}</div>
      ) : (
        <div className="login">
          <input
            id="name-input"
            className="username browser-default"
            type="text"
            placeholder="user name"
            value={props.userName}
            onChange={getUserName}
          />
          <button onClick={logIn}>log in</button>
        </div>
      )}
      <img className="logo" src={logo} alt="" />
      <form className="search-bar">
        <input
          className="search-input browser-default"
          type="text"
          placeholder="search something"
        />
        <button className="search-btn">
          <i class="fas fa-search"></i>
        </button>
      </form>
      <form className="create-bar">
        <button
          className="create-post-button"
          type="text"
          onClick={displayForm}
        >
          Create Post
        </button>
      </form>
    </div>
  );
};

export default Header;
