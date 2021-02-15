import "./style.css"
import "materialize-css/dist/css/materialize.min.css";
import MainScreen from "./Components/MainScreen"
import Header from "./Components/Header";
import firebase from "firebase";


function App() {
  return (
    <div className="wrapper">
      <Header />
      <MainScreen />
    </div>
  
  );
}

export default App;
