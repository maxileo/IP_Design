import React from "react";
import styles from "../css/navbar.module.css";

function navbar(props) {
  if (props.roleName == "mafioso" || props.roleName == "godfather") {
    return (
      <div className={styles.navbarContainer}>
        <div className={styles.picture}>
          <img src="../media/dead.png" alt="profile" />
        </div>
        <h1 id={styles.Txt}>{props.userName}</h1>
        <h1 id={styles.mafiaTxt}>{props.roleName}</h1>
        <div className={styles.writeWillButton}>
          <button id={styles.willAction}>Write WILL</button>
        </div>
      </div>
    );
  } else if (
    props.roleName == "sheriff" ||
    props.roleName == "lookout" ||
    props.roleName == "investigator" ||
    props.roleName == "jailor" ||
    props.roleName == "doctor" ||
    props.roleName == "escort" ||
    props.roleName == "medium"
  ) {
    return (
      <div className={styles.navbarContainer}>
        <div className={styles.picture}>
          <img src="../media/dead.png" alt="profile" />
        </div>
        <h1 id={styles.Txt}>{props.userName}</h1>
        <h1 id={styles.townTxt}>{props.roleName}</h1>
        <div className={styles.writeWillButton}>
          <button id={styles.willAction}>Write WILL</button>
        </div>
      </div>
    );
  } else if (
    props.roleName == "framer" ||
    props.roleName == "serialKiller" ||
    props.roleName == "executioner" ||
    props.roleName == "jester"
  ) {
    return (
      <div className={styles.navbarContainer}>
        <div className={styles.picture}>
          <img src="../media/dead.png" alt="profile" />
        </div>
        <h1 id={styles.Txt}>{props.userName}</h1>
        <h1 id={styles.neutralTxt}>{props.roleName}</h1>
        <div className={styles.writeWillButton}>
          <button id={styles.willAction}>Write WILL</button>
        </div>
      </div>
    );
  }
}
export default navbar;
