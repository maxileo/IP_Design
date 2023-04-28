import React from "react";
import styles from "../css/navbar.module.css";

function navbar(props) {
  return (
    <div className={styles.navbarContainer}>
      <div className={styles.picture}>
        <img src="../media/dead.png" alt="profile" />
      </div>
      <div className={styles.userName}>
        <h1>{props.currentUser.currentUserName}</h1>
      </div>
      <div className={styles.roleName}>
        <h1>{props.currentUser.currentRoleName}</h1>
      </div>
      <div className={styles.writeWillButton}>
        <button>Write WILL</button>
      </div>
    </div>
  );
}
export default navbar;
