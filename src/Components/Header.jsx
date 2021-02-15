import React from "react";
import "./styles/header.css";
import logo from "./images/WannabeRedditLogo.png";

const Header = (props) => {
  return (
    <div className="header">
      <h3>Wannabe Reddit</h3>
      <div className="login">
        <button>log in</button>
        <div className="user">L</div>
      </div>
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
    </div>
  );
};

export default Header;
