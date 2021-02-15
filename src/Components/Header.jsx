import React, { useState, useEffect } from "react";
import "./styles/header.css";
import logo from "./images/WannabeRedditLogo.png";
import firebase from "firebase";

const Header = (props) => {
  const [userName, setUserName] = useState("");
  const [logged, setLogged] = useState(false);
  const [firstLetter, setFirstLetter] = useState("");

  const getUserName = (e) => {
    setUserName(e.target.value);
  };

  const getUserLetter = () => {
    let name = userName;
    let letter = name[0].toUpperCase();
    setFirstLetter(letter);
  };

  const logIn = () => {
    if (userName !== "") {
      firebase
        .auth()
        .signInAnonymously()
        .then(() => {
          console.log("signed in", userName);
          getUserLetter();
          setLogged(true);
        })
        .catch((error) => console.error("cant log in" + error));
    } else {
      alert("please enter your user name");

    }
  };

  const createPost = (e) => {
    e.preventDefault();
    if (logged) {
      firebase.firestore().collection("posts").add({
        title: "hola",
        description: "chao"
      }).then(console.log("upped"))

      console.log("added");
    } else {
      alert("log in before you try to post something")
    }
  };

  return (
    <div className="header">
      <h3>Wannabe Reddit</h3>
      {logged ? (
        <div className="user">{firstLetter}</div>
      ) : (
        <div className="login">
          <input
            id="name-input"
            className="username browser-default"
            type="text"
            placeholder="user name"
            value={userName}
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
        <input
          className="create-input browser-default"
          type="text"
          placeholder="create something"
        />
        <button onClick={createPost} className="create-btn">
          <i class="fas fa-plus-circle"></i>
        </button>
      </form>{" "}
    </div>
  );
};

export default Header;
