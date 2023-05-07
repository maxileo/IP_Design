import styles from '../css/chat.module.css';

function Message(props)
{
    return (
        <div className={props.sentByUser ? styles.sentByUser : styles.sentByOtherUser }>
            <div className={styles.columns}>
                <div className={styles.messageUserName}>{props.message.userName} {new Date(props.message.createdAt*1000).toISOString().slice(11, 16)}</div>
                <div className={styles.messageContainer}>
                    <div className={styles.messageText}>
                        {props.message.content}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Message;