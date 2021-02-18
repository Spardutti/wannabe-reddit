import "./style.css";
import "materialize-css/dist/css/materialize.min.css";
import MainScreen from "./Components/MainScreen";
import Header from "./Components/Header";
import firebase from "firebase";
import { useState, useEffect } from "react";
import PostForm from "./Components/PostForm";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [logged, setLogged] = useState(false);
  const [userName, setUserName] = useState("");

  const createPost = (e) => {
    e.preventDefault();
    setShowForm(false);
  };

  return (
    <div className="wrapper">
      <Header
        userName={userName}
        setUserName={setUserName}
        setShowForm={setShowForm}
        setLogged={setLogged}
        logged={logged}
      />
      {showForm ? (
        <PostForm
          logged={logged}
          setShowForm={setShowForm}
          createPost={createPost}
          userName={userName}
        />
      ) : (
          <MainScreen userName={userName} logged={logged}/>
      )}
    </div>
  );
}

export default App;
