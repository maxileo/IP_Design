import React from "react";
import styles from "../css/navbar.module.css";
const { getOwnWillRequest } = require('../functions/requests.js')
const { updateWillRequest } = require('../functions/requests.js')


async function handleWillClick(lobbyId, token) {
  let descriptionElement = document.getElementById(styles.willContainer);
  let willElement = document.getElementById(styles.willText);

  willElement.textContent = await getOwnWillRequest(lobbyId, token);

  descriptionElement.style.display = "flex";
}
function handleCloseDescriptionClick() {
  let descriptionElement = document.getElementById(styles.willContainer);
  descriptionElement.style.display = "none";
}

async function handleSaveWillClick(lobbyId, token) {
  let willElement = document.getElementById(styles.willText);
  const utcTimestamp = new Date().getTime();
  let response = await updateWillRequest(lobbyId, utcTimestamp, willElement.textContent, token);
}

function Navbar(props) {
  let roleColor;
  if (props.roleName === "mafioso" || props.roleName === "godfather") {
    roleColor = styles.mafiaTxt;
  } else if (
    props.roleName === "framer" ||
    props.roleName === "serialKiller" ||
    props.roleName === "executioner" ||
    props.roleName === "jester"
  ) {
    roleColor = styles.neutralTxt;
  } else if (
    props.roleName === "sheriff" ||
    props.roleName === "lookout" ||
    props.roleName === "investigator" ||
    props.roleName === "jailor" ||
    props.roleName === "doctor" ||
    props.roleName === "escort" ||
    props.roleName === "medium"
  ) {
    roleColor = styles.townTxt;
  }
  return (
    <div>
      {/* {navbar} */}
      <div className={styles.navbarContainer}>
        <div className={styles.picture}>
          <img src="../media/dead.png" alt="profile" />
        </div>
        <h1 id={styles.Txt}>{props.userName}</h1>
        <h1 className={roleColor}>({props.roleName})</h1>
        <div className={styles.writeWillButton}>
          <button id={styles.willAction} onClick={(e) => handleWillClick(props.lobbyId, props.token)}>
            Write WILL
          </button>
        </div>
      </div>

      {/* {will} */}
      <div id={styles.willContainer} style={{ display: "none" }}>
        <input
          onClick={(e) => handleCloseDescriptionClick()}
          id={styles.closeWill}
          type="image"
          src="/media/close.png"
          alt=""
        ></input>
        <textarea
          autoComplete="off"
          placeholder="Write your WILL!"
          id={styles.willText}
        ></textarea>
        <div className={styles.saveWillButton}>
          <button 
            id={styles.saveButton}
            onClick={(e) => handleSaveWillClick(props.lobbyId, props.token)}
          >Save WILL
          </button>
        </div>
      </div>
    </div>
  );
}
export default Navbar;
