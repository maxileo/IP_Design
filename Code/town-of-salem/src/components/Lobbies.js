import styles from '../css/lobbies.module.css';
import { useState } from "react";

function Lobbies(props)
{
    return(
        <div className={styles.all}>
            <div className={styles.topBarContainer}>
                <button id={styles.button}>Create Lobby</button>
                <button id={styles.button}>Search by ID</button>
            </div>
            <div className={styles.allLobbiesContainer}>
            </div>
        </div> 
    );
}