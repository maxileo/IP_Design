import styles from "../css/lobby.module.css";
import { useState } from "react";

async function postData(url, data) {
  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log(error);
  }
}

async function handleChooseClick(target, setName, setPressed) {
  let userName = document.getElementById(styles.name).value;

  if (userName.length > 0) {
    let data = {
      userId: "",
    };
    data.userId = userName;

    await postData("http://localhost:3000/lobbies", data);

    setName(userName);

    setPressed(true);
  }
}

async function handleStartClick(pressed) {
  if (pressed) {
    let data = {
      start: true,
    };

    await postData("http://localhost:3000/state/0/start_game", data);
  }
}

function Lobby(props) {
  const [pressed, setPressed] = useState(false);

  return (
    <div className={styles.center}>
      <div className={styles.formContainer}>
        <h1>PLEASE CHOOSE A USERNAME</h1>
        <input
          type="text"
          minLength="1"
          maxLength="15"
          id={styles.name}
        ></input>
        <div className={styles.buttonBackgroundLobby}>
          <button
            onClick={(e) =>
              handleChooseClick(e.target, props.setName, setPressed)
            }
            id={styles.choose}
            className={styles.buttonLobby}
          >
            CHOOSE
          </button>
        </div>
        <h1>WHEN YOU ARE READY PRESS START TO START THE GAME</h1>
        <div className={styles.buttonBackgroundLobby}>
          <button
            onClick={(e) => handleStartClick(pressed)}
            id={styles.start}
            className={styles.buttonLobby}
          >
            START
          </button>
        </div>
      </div>
    </div>
  );
}

export default Lobby;
