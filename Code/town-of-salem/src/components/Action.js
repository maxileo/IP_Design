import styles from '../css/action.module.css';
import stylesUser from '../css/users.module.css';
import stylesAction from '../css/action.module.css';
const { sendMessageRequest } = require('../functions/requests.js')

function postData(data) 
{
    console.log(JSON.stringify(data));

    fetch('http://localhost:3000/state/000000', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("token")
        }
    });
}

async function handleSendClick(target, gameState, currentUser, lobbyId, token)
{
    let textArea = document.getElementById(styles.messageTextArea);

    let response = await sendMessageRequest(lobbyId, textArea.value, token);
    console.log(response);
}

let infoText = "";
let buttonText = "";

function handleClick(target, gameState, currentUser, judgedCharacter, mapUsersToId)
{
    if (currentUser.isAlive && (gameState.state == "Voting" || gameState.state == "Selection" || gameState.state == "Night"))
    {
        let selectedUsers = Array.from(
            document.getElementsByClassName(stylesUser.selected)
        );

        if (selectedUsers.length > 0 || gameState.state == "Voting")
        {

            let data = {
                userId: "",
                targets: []
            };

            data.userId = currentUser.userName;
            //data.userId = currentUser.userId;

            if (gameState.state == "Voting")
            {
                data.targets.push(mapUsersToId.get(judgedCharacter));
                //data.targets.push(judgedCharacter);
            }
            else
            {
                let selectedUsersAction = Array.from( document.getElementsByClassName(stylesAction.selectedUser));
                for (let i = 0; i < selectedUsers.length; i++)
                {
                    data.targets.push(mapUsersToId.get(selectedUsersAction[i].innerText));
                    //data.targets.push(selectedUsersAction[i].innerText);
                }
            }
            

            postData(data);
        }
    }
}

function Action(props)
{
    if (props.gameState.state == "Selection") {
        let selectedUsers = Array.from(
            document.getElementsByClassName(stylesUser.selected)
        );
        infoText = "You have chosen:";
        if (selectedUsers.length == 0)
            infoText = "Choose someone from the Players list";
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
            <div className={styles.buttonBackground}>
                <button 
                    onClick={e => handleClick(e.target, props.gameState, props.currentUser, props.judgedCharacter, props.mapUsersToId)}
                    id={styles.action}>{buttonText}
                </button>
            </div>
        </div>
    );
    }
    else if (props.gameState.state === "Discussion")
    {
        return (
            <div className={styles.actionContainer}>
                <textarea 
                    autoComplete="off" placeholder="..." spellCheck="false" id={styles.messageTextArea}> 
                </textarea>
                <div className={styles.buttonBackground}>
                    <button 
                        onClick={e => handleSendClick(e.target, props.gameState, props.currentUser, props.lobbyId, props.token)}
                        id={styles.action}>Send
                    </button>
                </div>
            </div>

        );
    }
    else
    {
        return (
            <div></div>
        );
    }
}

export default Action;