import styles from '../css/action.module.css';
import stylesUser from '../css/users.module.css';
import stylesAction from '../css/action.module.css';
import React, { useState, useEffect } from 'react';
const { sendMessageRequest } = require('../functions/requests.js')

function postData(data) {
    console.log(JSON.stringify(data));

    fetch('https:ip.tudorhutu.ro/state/' + sessionStorage.getItem("lobbyId"), {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            "Authorization": sessionStorage.getItem("token")
        }
    });
}

async function handleSendClick(target, gameState, currentUser, lobbyId, token) {
    let textArea = document.getElementById(styles.messageTextArea);

    let response = await sendMessageRequest(lobbyId, textArea.value, token);
    console.log(response);
    textArea.value = "";
}

let infoText = "";
let buttonText = "";

function handleClick(target, gameState, currentUser, judgedCharacter, mapUsersToId, setButtonPressed) {
    if (currentUser.isAlive && (gameState.state == "Voting" || gameState.state == "Selection" || gameState.state == "Night")) {
        let descriptionElement = document.getElementsByClassName(styles.buttonBackground);
        let selectedUsers = Array.from(
            document.getElementsByClassName(stylesUser.selected)
        );

        if (selectedUsers.length > 0 || gameState.state == "Voting")
        {  
            descriptionElement[0].style.display = "none";
            setButtonPressed(true);
            let data = {
                userId: "",
                targets: []
            };

            data.userId = currentUser.userName;
            //data.userId = currentUser.userId;

            if (gameState.state == "Voting") {
                data.targets.push(mapUsersToId.get(judgedCharacter));
                //data.targets.push(judgedCharacter);
            }
            else {
                let selectedUsersAction = Array.from(document.getElementsByClassName(stylesAction.selectedUser));
                for (let i = 0; i < selectedUsers.length; i++) {
                    data.targets.push(mapUsersToId.get(selectedUsersAction[i].innerText));
                    //data.targets.push(selectedUsersAction[i].innerText);
                }
            }

            let userList = document.getElementsByClassName(stylesUser.listUserName);
            for (let i = 0; i < userList.length; i++) {
                userList[i].disabled = true;
            }

            postData(data);
        }
    }

}

function Action(props) {
    const [buttonPressed, setButtonPressed] = useState(false);

    useEffect(() => {
        const selectedUsers = Array.from(document.getElementsByClassName(stylesUser.selected));
        selectedUsers.forEach(user => user.classList.remove(stylesUser.selected));
        let userList = document.getElementsByClassName(stylesUser.listUserName);
        for (let i = 0; i < userList.length; i++) {
            userList[i].disabled = false;
        }
        setButtonPressed(false);
    }, [props.gameState.state]);

    if (props.gameState.state == "Selection") {
        let selectedUsers = Array.from(
            document.getElementsByClassName(stylesUser.selected)
        );
        infoText = "You have chosen:";
        if (selectedUsers.length == 0)
            infoText = "Choose someone from the Players list";
        if (buttonPressed === true)
            infoText = "YOU SELECTED";
        buttonText = "SELECT";
    }
    if (props.gameState.state == "Voting") {
        infoText = "Choose if " + props.judgedCharacter + " is guilty";
        buttonText = "GUILTY";
    }

    if (props.gameState.state == "Night") {
        infoText = "You have chosen:";
        let selectedUsers = Array.from(
            document.getElementsByClassName(stylesUser.selected)
        );
        if (selectedUsers.length == 0)
            infoText = "Choose someone from the Players list";
        if (buttonPressed === true)
            infoText = `YOU CHOSE TO ${props.currentUser.actionText}`;
        buttonText = props.currentUser.actionText;
    }

    if ((props.gameState.state == "Voting" || props.gameState.state == "Selection" || props.gameState.state == "Night"))
    {
    return (
        <div className={styles.actionContainer}>
            <div className={styles.selectedContainer}>
                <h3 id={styles.selectedTxt} >{infoText}</h3>
                <div id={styles.usersSelected}>
                    <div className={styles.selectedUser} style={{display: 'none'}}>User1</div>
                    <div className={styles.selectedUser} style={{display: 'none'}}>User2</div>
                </div>
            </div>
            <div className={styles.buttonBackground} style={{display: 'block'}}>
                <button 
                    onClick={e => handleClick(e.target, props.gameState, props.currentUser, props.judgedCharacter, props.mapUsersToId, setButtonPressed)}
                    id={styles.action}>{buttonText}
                </button>
            </div>
        </div>
    );
    }
    else if (props.gameState.state === "Discussion")
    { 
        if(props.currentUser.isAlive === false)
        return (
            <div className={styles.actionContainer}>
                <textarea 
                     disabled = "true"  autoComplete="off" placeholder="You are dead, you can't send message anymore..." spellCheck="false" id={styles.messageTextArea}> 
                </textarea>
            </div>

        );
        else{
            if(props.currentUser.isAlive === true)
        return (
            <div className={styles.actionContainer}>
                <div className={styles.selectedContainer}>
                    <h3 id={styles.selectedTxt} >{infoText}</h3>
                    <div id={styles.usersSelected}>
                        <div className={styles.selectedUser} style={{ display: 'none' }}>User1</div>
                        <div className={styles.selectedUser} style={{ display: 'none' }}>User2</div>
                    </div>
                </div>
                <div className={styles.buttonBackground} style={{ display: 'block' }}>
                    <button
                        onClick={e => handleClick(e.target, props.gameState, props.currentUser, props.judgedCharacter, props.mapUsersToId, setButtonPressed)}
                        id={styles.action}>{buttonText}
                    </button>
                </div>
            </div>
        );
    }
    }
    else {
        return (
            <div></div>
        );
    }
}

export default Action;