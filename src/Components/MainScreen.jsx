import React, { useState, useEffect } from "react";
import "./styles/mainscreen.css";
import Cards from "./Cards";
import Welcome from "./Welcome";
import firebase from "firebase";
import uniqid from "uniqid";
import FullPost from "./FullPost";
import Moment from "moment";

const MainScreen = (props) => {
  const [posts, setPosts] = useState([]);
  const [fullPost, setFullPost] = useState(false);
  const [postId, setPostId] = useState("");
  //figure how ti display a post after it is created;
  const getPost = () => {
    firebase
      .firestore()
      .collection("posts")
      .orderBy("timestamp", "desc")
      .get()
      .then((snapshot) => {
        snapshot.forEach((elem) => {
          let post = {
            title: elem.data().title,
            description: elem.data().description,
            author: elem.data().author,
            id: uniqid(),
            time: elem.data().timestamp,
          };
          setPosts((oldarray) => [...oldarray, post]);
        });
      });
  };

  useEffect(() => {
    getPost();
  }, []);

  const openPost = (e) => {
    let id = e.target.parentNode.id;
    setPostId(id);
    setFullPost(true);
  };

  useEffect(() => {}, [postId]);

  const hidePost = () => {
    setFullPost(false);
  };

  return (
    <div>
      {fullPost ? (
        <div>
          {posts.map((e) => {
            if (e.id === postId) {
              return (
                <FullPost
                  hidePost={hidePost}
                  author={e.author}
                  title={e.title}
                  description={e.description}
                  time={Moment(e.time.toDate()).fromNow()}
                />
              );
            }
          })}
        </div>
      ) : (
        <div className="main-screen">
          <Welcome />
          {posts.map((e) => {
            return (
              <Cards
              time={Moment(e.time.toDate()).fromNow()}
                id={e.id}
                openPost={openPost}
                author={e.author}
                title={e.title}
                description={e.description}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MainScreen;
