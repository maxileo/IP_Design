import styles from '../css/action.module.css';

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
            <button id={styles.action}>VOTE</button>
        </div>
    );
}

export default Action;