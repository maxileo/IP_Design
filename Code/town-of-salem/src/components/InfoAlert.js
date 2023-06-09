import styles from "../css/infoAlert.module.css";

export default function InfoAlert(props) {
  let nightResults = props.currentUser.nightResults;
  
  if (nightResults) {
    for (let i = 0; i < nightResults.length; i++)
    {
      const newString = nightResults[i].replace(/[0-9]+/g, (match) => {
        const mappedString = props.mapIdToUsers.get(match);
        return mappedString ? mappedString : match;
      });

      nightResults[i] = newString;
    }
  }

  let actionText = props.currentUser.actionText;
  if (actionText) {
    const newString2 = actionText.replace(/[0-9]+/g, (match) => {
      const mappedString = props.mapIdToUsers.get(match);
      return mappedString ? mappedString : match;
    });
    actionText = newString2;
  }



  

  if (props.gameState.state === "Voting")
    return (
      <div className={styles.infoAlertContainer}>
        <h2 id={styles.Txt}>Remaining {props.gameState.state} time:</h2>
        <h1 id={styles.Txt}>{props.timeLeft > 0 ? props.timeLeft : 0} sec</h1>
        <h2 id={styles.Txt}>You have to vote if {props.judgedCharacter} is guilty or innocent.</h2>
      </div>
    );
  if (props.gameState.state === "Selection")
    return (
      <div className={styles.infoAlertContainer}>
        <h2 id={styles.Txt}>Remaining {props.gameState.state} time:</h2>
        <h1 id={styles.Txt}>{props.timeLeft > 0 ? props.timeLeft : 0} sec</h1>
        <h2 id={styles.Txt}>Select someone to be voted guilty or innocent</h2>
      </div>
    );
  else if (props.gameState.state === "Night")
    return (
      <div className={styles.infoAlertContainer}>
        <h2 id={styles.Txt}>Remaining {props.gameState.state} time:</h2>
        <h1 id={styles.Txt}>{props.timeLeft} sec</h1>
        <h2 id={styles.Txt}>
          You have to choose someone to {actionText}
        </h2>
      </div>
    );
  else if (props.gameState.state === "NightEnding")
    return (
      <div className={styles.infoAlertContainer}>
        <h2 id={styles.Txt}>The night has ended.</h2>
        {nightResults.map((result) => (
        <h2 className={styles.TxtResult}>&lt;{result}&gt;</h2>
        ))}
        <h2 id={styles.Txt}>Prepare for the day to start</h2>
      </div>
    );
  else if (props.gameState.state === "DayEnding")
    return (
      <div className={styles.infoAlertContainer}>
        <h2 id={styles.Txt}>The night is starting, do your role carefully</h2>
      </div>
    );
  else if (props.gameState.state === "Discussion")
    return (
      <div className={styles.infoAlertContainer}>
        <h2 id={styles.Txt}>Discussion time</h2>
        <h2 id={styles.Txt}>Remaining {props.gameState.state} time:</h2>
        <h1 id={styles.Txt}>{props.timeLeft} sec</h1>
        <h2 id={styles.Txt}>  </h2>
      </div>
    );
}
