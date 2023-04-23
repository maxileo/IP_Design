import { useState } from "react";
import styles from "../css/infoAlert.module.css";

export default function InfoAlert(props) {
  if (props.gameState.state == "Voting")
    return (
      <div className={styles.infoAlertContainer}>
        <h2 id={styles.Txt}>Remaining {props.gameState.state} time:</h2>
        <h1 id={styles.Txt}>{props.timeLeft > 0 ? props.timeLeft : 0} sec</h1>
        <h2 id={styles.Txt}>You have to vote if {props.judgedCharacter} is guilty or innocent.</h2>
      </div>
    );
  if (props.gameState.state == "Selection")
    return (
      <div className={styles.infoAlertContainer}>
        <h2 id={styles.Txt}>Remaining {props.gameState.state} time:</h2>
        <h1 id={styles.Txt}>{props.timeLeft > 0 ? props.timeLeft : 0} sec</h1>
        <h2 id={styles.Txt}>Select someone to be voted guilty or innocent</h2>
      </div>
    );
  else if (props.gameState.state == "Night")
    return (
      <div className={styles.infoAlertContainer}>
        <h2 id={styles.Txt}>Remaining {props.gameState.state} time:</h2>
        <h1 id={styles.Txt}>{props.timeLeft} sec</h1>
        <h2 id={styles.Txt}>
          You have to choose someone to {props.currentUser.actionText}
        </h2>
      </div>
    );
  else if (props.gameState.state == "NightEnding")
    return (
      <div className={styles.infoAlertContainer}>
        <h2 id={styles.Txt}>The night has ended.</h2>
        {props.currentUser.nightResults.map((result) => (
        <h2 className={styles.TxtResult}>&lt;{result}&gt;</h2>
        ))}
        <h2 id={styles.Txt}>Prepare for the day to start</h2>
      </div>
    );
  else if (props.gameState.state == "DayEnding")
    return (
      <div className={styles.infoAlertContainer}>
        <h2 id={styles.Txt}>The night is starting, do your role carefully</h2>
      </div>
    );
}
