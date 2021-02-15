import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import firebase from "firebase/app";

  var firebaseConfig = {
    apiKey: "AIzaSyBZihmzAm9xUQdspJ8tibtsgvbSo74wuhY",
    authDomain: "wannabe-reddit.firebaseapp.com",
    projectId: "wannabe-reddit",
    storageBucket: "wannabe-reddit.appspot.com",
    messagingSenderId: "584479580481",
    appId: "1:584479580481:web:b568af9036ea3ae087c1c0"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

 
  

ReactDOM.render(
    <App />,
  document.getElementById('root')
);
