import styles from '../css/action.module.css';
import stylesUser from '../css/users.module.css';
import stylesAction from '../css/action.module.css';

function postData(data) 
{
    console.log(JSON.stringify(data));

    fetch('../post.json', {
        method: 'post',
        body: JSON.stringify(data)
    });
}

function handleClick(target, gameState, currentUser)
{
    if (currentUser.isAlive)
    {
        let selectedUsers = Array.from(
            document.getElementsByClassName(stylesUser.selected)
        );

        if (selectedUsers.length > 0)
        {

            let selectedUsersAction = Array.from( document.getElementsByClassName(stylesAction.selectedUser));

            let data = {
                username: "",
                targets: []
            };

            data.username = currentUser.userName;

            for (let i = 0; i < selectedUsers.length; i++)
            {
                data.targets.push(selectedUsersAction[i].innerText);
            }
            

            postData(data);
        }
    }
}

function Action(props)
{
    return (
        <div className={styles.actionContainer}>
            <div className={styles.selectedContainer}>
                <h3 id={styles.selectedTxt} >You have selected:</h3>
                <div id={styles.usersSelected}>
                    <div className={styles.selectedUser} style={{display: 'none'}}>User1</div>
                    <div className={styles.selectedUser} style={{display: 'none'}}>User2</div>
                </div>
            </div>
            <button 
                onClick={e => handleClick(e.target, props.gameState, props.currentUser)}
                id={styles.action}>{props.gameState.state == "voting" ? "VOTE" : props.currentUser.actionText}
            </button>
        </div>
    );
}

export default Action;