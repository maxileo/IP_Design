import { useState } from "react";
import styles from "../css/users.module.css";
import stylesAction from "../css/action.module.css";

function handleClick(target, user, currentUser, gameState) {
  let nrMaxSelection = currentUser.nrOfSelection;
  if (
    user.isAlive &&
    (gameState.state == "Selection" || gameState.state == "Night")
  ) {
    let selectedUsers = Array.from(
      document.getElementsByClassName(styles.selected)
    );

    let usersSelectedElement = document.getElementById(
      stylesAction.usersSelected
    );

    if (
      selectedUsers.length < nrMaxSelection ||
      target.classList.contains(styles.selected)
    )
      target.classList.toggle(styles.selected);

    selectedUsers = Array.from(
      document.getElementsByClassName(styles.selected)
    );

    let selectedUsersAction = Array.from(
      document.getElementsByClassName(stylesAction.selectedUser)
    );
    for (let i = 0; i < selectedUsers.length; i++) {
      selectedUsersAction[i].style.display = "block";
      selectedUsersAction[i].innerText = selectedUsers[i].innerText;
    }
    for (let i = selectedUsers.length; i < nrMaxSelection; i++) {
      selectedUsersAction[i].style.display = "none";
    }
  }
}

function handleDeadClick(target) {
  let userName = target.parentElement.firstChild.innerText;
  let willElement = document.getElementById(styles.willContainer);
  willElement.style.display = "block";

  let willTitle = willElement.firstChild.lastChild;
  willTitle.innerText = userName + "` will";

  let willText = willElement.lastChild;
  willText.innerText = "This is the will of user: " + userName;
}

function User(props) {
  let userObj = props.user;

  return (
    <div className={styles.userContainer}>
      <div className={styles.buttonBackground}>
        <button
          onClick={(e) =>
            handleClick(e.target, userObj, props.currentUser, props.gameState)
          }
          className={styles.listUserName}
        >
          {userObj.userName}
        </button>
      </div>
      {userObj.isAlive ? (
        <></>
      ) : (
        <input
          onClick={(e) => handleDeadClick(e.target)}
          className={styles.deadIcon}
          type="image"
          src="/media/dead.png"
        ></input>
      )}
    </div>
  );
}

export default User;
