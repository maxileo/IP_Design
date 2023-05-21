import styles from '../css/lobbyContainer.module.css';

async function handleJoinLobbyClick(token, idLobby)
{
    //let response = await sendJoinLobbyRequest(idLobby, token);
    window.location.pathname = "/game";
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