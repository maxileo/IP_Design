import styles from '../css/lobbyContainer.module.css';
const { sendToLobby } = require('../functions/requests.js')

async function handleJoinLobbyClick(token, idLobby)
{
    sessionStorage.setItem("lobbyId", idLobby);
    token = sessionStorage.getItem("token");
    console.log(token);
    let response = await sendToLobby(idLobby, token);
    setTimeout(() => {
        window.location.pathname = "/game";
    },
        1000
    );
}


function LobbyContainer(props) {
  return (
    <div className={styles.lobbyContainer}>
      <div className={styles.lobbyId}>LOBBY {props.id}</div>
      <div className={styles.userCount}>Users in lobby: {props.users}</div>
      <div className={styles.buttonBackgroundLobby}>
        <button className={styles.joinButton}
          onClick={e => handleJoinLobbyClick(props.token, props.id)}
        >Join</button>
      </div>
    </div>
  );
};

export default LobbyContainer;