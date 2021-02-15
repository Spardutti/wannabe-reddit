import React, { useState, useEffect } from "react";
import "./styles/mainscreen.css";
import Cards from "./Cards";
import Welcome from "./Welcome";
import firebase from "firebase";

const MainScreen = (props) => {
  const [posts, setPosts] = useState([]);

  const getPost = () => {
    firebase
      .firestore()
      .collection("posts")
      .get()
      .then((snapshot) => {
        snapshot.forEach((elem) => {
          let post = {
            title: elem.data().title,
            description: elem.data().description,
          };
          setPosts((oldarray) => [...oldarray, post]);
        });
      });
  };

  useEffect(() => {
    getPost();
  }, []);

  return (
    <div className="main-screen">
      <Welcome />
      {posts.map((e) => {
        return <Cards title={e.title} description={e.description} />;
      })}
    </div>
  );
};

export default MainScreen;
