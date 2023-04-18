import { useState } from "react";
import styles from "../css/infoAlert.module.css";

export default function InfoAlert(props) {
  if (props.gameState.state == "voting")
    return (
      <div className={styles.infoAlertContainer}>
        <h2 id={styles.Txt}>Remaining {props.gameState.state} time:</h2>
        <h1 id={styles.Txt}>{props.timeLeft} sec</h1>
        <h2 id={styles.Txt}>You have to vote for someone</h2>
      </div>
    );
  else if (props.gameState.state == "night")
    return (
      <div className={styles.infoAlertContainer}>
        <h2 id={styles.Txt}>Remaining {props.gameState.state} time:</h2>
        <h1 id={styles.Txt}>{props.timeLeft} sec</h1>
        <h2 id={styles.Txt}>
          You have to choose someone to {props.currentUser.actionText}
        </h2>
      </div>
    );
  else if (props.gameState.state == "nightStart")
    return (
      <div className={styles.infoAlertContainer}>
        <h2 id={styles.Txt}>The night is starting, do your role carefully</h2>
      </div>
    );
  else if (props.gameState.state == "votingEnd")
    return (
      <div className={styles.infoAlertContainer}>
        <h2 id={styles.Txt}>The voting round has ended</h2>
      </div>
    );
}
