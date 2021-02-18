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
  const [postComments, setPostComments] = useState([]);

  //get the post from the database
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
            time: elem.data().timestamp,
            id: elem.data().id,
          };
          //get the data from the DB and set it on an array to display it
          setPosts((oldarray) => [...oldarray, post]);
        });
      });
  };
  //updates the dom
  useEffect(() => {
    getPost();
  }, []);

  //open the clicked post to see the comments/full post
  const openPost = (e) => {
    let id = e.target.parentNode.id;
    firebase
      .firestore()
      .collection("posts")
      .where("id", "==", id)
      .get()
      .then((snapshot) => {
        snapshot.forEach((e) => {
          let arr = e.data().comments;
          setPostComments((old) => [...old, arr]);
          console.log(arr);
        });
      });
    setPostId(id);
    setFullPost(true);
  };

  useEffect(() => {}, [postId]);

  //hide the post / retur to mainSCreen
  const hidePost = () => {
    setFullPost(false);
  };

  return (
    <div>
      {fullPost ? (
        //display the clickec post maximized
        <div>
          {posts.map((e) => {
            if (e.id === postId) {
              return (
                <FullPost
                  logged={props.logged}
                  id={e.id}
                  hidePost={hidePost}
                  author={e.author}
                  title={e.title}
                  description={e.description}
                  time={Moment(e.time.toDate()).fromNow()}
                  userName={props.userName}
                />
              );
            }
          })}
        </div>
      ) : (
        //display a list of all the post minized
        <div className="main-screen">
          <Welcome />
          {posts.map((e) => {
            if (e.time === null) {
              e.time = Moment();
            } else
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
