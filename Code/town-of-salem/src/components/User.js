import { useEffect, useState } from 'react';
import styles from '../css/users.module.css';
import stylesAction from '../css/action.module.css';
const { getUserWillRequest } = require('../functions/requests.js')

function handleClick(target, user, currentUser, gameState) {
    let nrMaxSelection = currentUser.nrOfSelection;
    if (user.isAlive && (gameState.state == "Selection" || gameState.state == "Night")) {
        let selectedUsers = Array.from(
            document.getElementsByClassName(styles.selected)
        );

        let usersSelectedElement = document.getElementById(stylesAction.usersSelected);

        // if (selectedUsers.length < nrMaxSelection || target.classList.contains(styles.selected))
        //     target.classList.toggle(styles.selected);
        if (nrMaxSelection === 1) {
            if (selectedUsers[0] !== target)
                selectedUsers[0]?.classList.toggle(styles.selected);
            target.classList.toggle(styles.selected);
        } else if (nrMaxSelection === 2) {
            selectedUsers[1] = selectedUsers[0];
            selectedUsers[0] = target;
            selectedUsers[1]?.classList.toggle(styles.selected);
            selectedUsers[0]?.classList.toggle(styles.selected);
        }
        // console.log(selectedUsers[0]);
        // console.log(target);

        selectedUsers = Array.from(
            document.getElementsByClassName(styles.selected)
        );

        let selectedUsersAction = Array.from(document.getElementsByClassName(stylesAction.selectedUser));
        for (let i = 0; i < selectedUsers.length; i++) {
            selectedUsersAction[i].style.display = "block";
            selectedUsersAction[i].innerText = selectedUsers[i].innerText;
        }
        for (let i = selectedUsers.length; i < nrMaxSelection; i++) {
            selectedUsersAction[i].style.display = "none";
        }
    }
}

async function handleDeadClick(target, lobbyId, token, userId) {
    console.log("cer will pt " + userId);
    let userName = target.parentElement.firstChild.innerText;
    let willElement = document.getElementById(styles.willContainer);
    willElement.style.display = "block";

    let willTitle = willElement.firstChild.lastChild;
    willTitle.innerText = userName + "` will";

    let willText = willElement.lastChild;
    willText.innerText = await getUserWillRequest(lobbyId, userId, token);
    //willText.innerText = "This is the will of user: " + userName;
}

function User(props) {
    if (props.gameState.state === "Discussion") {
        const selectedUsers = Array.from(
            document.getElementsByClassName(styles.selected)
        );
        selectedUsers.forEach(user => user.classList.toggle(styles.selected));
    }
    let userObj = props.user;

    return (
        <div className={styles.userContainer}>
            <div className={styles.buttonBackground}>
                <button onClick={e => handleClick(e.target, userObj, props.currentUser, props.gameState)}
                    className={styles.listUserName}>
                    {userObj.userName}
                </button>
            </div>
            {!userObj.isAlive && userObj.userName !== props.currentUser.userName ? (
                <input onClick={e => handleDeadClick(e.target, props.lobbyId, props.token, userObj.userId)}
                    className={styles.deadIcon} type="image" src='/media/dead.png'></input>
            ) : <></>}
        </div>
    );
}

export default User;