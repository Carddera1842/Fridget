import React, { useState } from "react";
import styles from "../styles/Home.module.css"; // Import CSS module
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div class="home">
      <div class="header">
        <h2>Fridgit</h2>
      </div>

      <div id="navbar" class="topnav" className={styles.topnav}>
        <a class="active" href="javascript:void(0)">
          Home
        </a>
        <a href="javascript:void(0)">My Ingredients</a>
        <a href="javascript:void(0)">My Recipes</a>
        <a href="javascript:void(0)">My Rewards</a>
        <a href="javascript:void(0)">Grocery List</a>
        <a href="#about" class="split" className={styles.login}>
          <Link to="/login" style={{ cursor: "pointer", color: "blue" }}>
            Login
          </Link>
        </a>
      </div>

      <div></div>
    </div>
  );
}