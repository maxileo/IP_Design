import React from "react";
import styles from "../css/navbar.module.css";

function navbar(props) {
  return (
    <div className={styles.navbarContainer}>
      <h1>{props.currentUser.userName}</h1>
    </div>
  );
}
export default navbar;
