import styles from '../css/chat.module.css';
import Message from './Message.js';

function Chat(props)
{

    return (
        <div className={styles.chatBigContainer}>
            <h3 id={styles.titleTxt}>Chat</h3>
            <div id={styles.chatContainer}>
                {
                    props.messages.map((message) => <Message 
                        message={message} 
                        sentByUser = {props.currentUser.userName === message.userName ? true : false} 
                    />
                )}
            </div>
        </div>
    );
}

export default Chat;