import React, { useState, useEffect } from "react";
import "./styles/mainscreen.css";
import Cards from "./Cards";
import Welcome from "./Welcome";
import firebase from "firebase";
import uniqid from "uniqid";
import FullPost from "./FullPost";
import Moment from "moment";

/* votes are updating when opening the fullpost, but are not updating when we
come back to the main screen. refreshing the page seems stupid
but if we set it with state we set the same votes for every card
need to figure this out    */
const MainScreen = (props) => {
  const [posts, setPosts] = useState([]);
  const [fullPost, setFullPost] = useState(false);
  const [postId, setPostId] = useState("");
  const [postComments, setPostComments] = useState([]);
  const [msgs, setMsgs] = useState(0);
  const [votes, setVotes ] = useState();

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
            upvotes: elem.data().upvotes,
            comments: elem.data().comments,
            msgs: 2
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
    if (props.logged) {
      let id = e.target.parentNode.parentNode.id;
      listenForChanges(id);
      firebase
        .firestore()
        .collection("posts")
        .where("id", "==", id)
        .get()
        .then((snapshot) => {
          snapshot.forEach((e) => {
            let arr = e.data().comments;
            setPostComments(arr);
            setVotes(e.data().upvotes)
          });
        });
      setPostId(id);
      setFullPost(true);
    } else {
      alert("Please log in");
    }
  };
//listen when new comments are added
  const listenForChanges = (id) => {
    firebase
      .firestore()
      .collection("posts")
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "modified") {
            setPostComments(change.doc.data().comments);
          }
        });
      });
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
                  postComments={postComments}
                  logged={props.logged}
                  id={e.id}
                  hidePost={hidePost}
                  author={e.author}
                  title={e.title}
                  description={e.description}
                  time={Moment(e.time.toDate()).fromNow()}
                  userName={props.userName}
                  upvotes={votes}
                  setVotes={setVotes}
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
                  msgs={msgs}
                  upvotes={e.upvotes}
                />
              );
          })}
        </div>
      )}
    </div>
  );
};

export default MainScreen;
