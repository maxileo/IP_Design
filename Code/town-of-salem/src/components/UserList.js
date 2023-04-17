import User from './User.js';
import styles from '../css/users.module.css';

function handleCloseWillClick()
{
    let willElement = document.getElementById(styles.willContainer);
    willElement.style.display = "none";
}

function UserList(props)
{
    let usersList = props.usersList;
    return (
        <div className={styles.usersWillContainer}>
            <div className={styles.usersListContainerDiv}>
                <h3 id={styles.playersTxt}>Players List</h3>
                <div className={styles.usersListContainer}>
                    {usersList.map((user) => <User key={user.id} user={user} gameState={props.gameState} currentUser={props.currentUser} />)}
                </div>
            </div>
            <div id={styles.willContainer} style={{display: "none"}}>
                <div className={styles.uiWillContainer}>
                    <input 
                        onClick={e => handleCloseWillClick()}
                        id={styles.closeWill} type="image" src='/media/close.png'>
                    </input>
                    <h3 id={styles.willTxt}>User will</h3>
                </div>
                <div id={styles.userWill}>This is the will of user.</div>
            </div>
        </div>
    );
}

export default UserList;