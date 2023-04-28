import React from "react";
import styles from "../css/navbar.module.css";

function navbar(props) {
  if (
    props.currentUser.currentRoleName == "mafioso" ||
    props.currentUser.currentRoleName == "godfather"
  ) {
    return (
      <div className={styles.navbarContainer}>
        <div className={styles.picture}>
          <img src="../media/dead.png" alt="profile" />
        </div>
        <h1 id={styles.Txt}>{props.currentUser.currentUserName}</h1>
        <h1 id={styles.mafiaTxt}>{props.currentUser.currentRoleName}</h1>
        <div className={styles.writeWillButton}>
          <button id={styles.willAction}>Write WILL</button>
        </div>
      </div>
    );
  } else if (
    props.currentUser.currentRoleName == "sheriff" ||
    props.currentUser.currentRoleName == "lookout" ||
    props.currentUser.currentRoleName == "investigator" ||
    props.currentUser.currentRoleName == "jailor" ||
    props.currentUser.currentRoleName == "doctor"
  ) {
    return (
      <div className={styles.navbarContainer}>
        <div className={styles.picture}>
          <img src="../media/dead.png" alt="profile" />
        </div>
        <h1 id={styles.Txt}>{props.currentUser.currentUserName}</h1>
        <h1 id={styles.townTxt}>{props.currentUser.currentRoleName}</h1>
        <div className={styles.writeWillButton}>
          <button id={styles.willAction}>Write WILL</button>
        </div>
      </div>
    );
  } else if (props.currentUser.currentRoleName == "neutral") {
    return (
      <div className={styles.navbarContainer}>
        <div className={styles.picture}>
          <img src="../media/dead.png" alt="profile" />
        </div>
        <h1 id={styles.Txt}>{props.currentUser.currentUserName}</h1>
        <h1 id={styles.neutralTxt}>{props.currentUser.currentRoleName}</h1>
        <div className={styles.writeWillButton}>
          <button id={styles.willAction}>Write WILL</button>
        </div>
      </div>
    );
  }
}
export default navbar;
