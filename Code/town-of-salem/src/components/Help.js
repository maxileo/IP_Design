import React from 'react';
import styles from '../css/help.module.css';

// butonul Help

function handleCloseDescriptionClick(setShowHelp)
{
    let descriptionElement = document.getElementById(styles.descriptionContainer);
    descriptionElement.style.display = "none";
    setShowHelp(false);
}

function Help(props)
{
    const [showHelp, setShowHelp] = React.useState(false);

    if(!showHelp)
        return <div className = {styles.divHelp}><button className = {styles.buttonCSS} onClick={() => setShowHelp(!showHelp)}>
            Help
        </button></div>;
    
    return (
        <div className={styles.helpDescriptionContainer}>
            {/* descrierea help-ului */}
            <div id={styles.descriptionContainer}>
                <div className={styles.uiDescriptionContainer}>
                    <input 
                        onClick={e => handleCloseDescriptionClick(setShowHelp)}
                        id={styles.closeDescription} type="image" src='/media/close.png' alt=''>
                    </input>
                   

                </div>
                <div id={styles.helpDescription}>
                    <div id={styles.helpGame}>
                        <h4 id={styles.aboutGameText}>About Game</h4>
                        <div id={styles.aboutGameDescription}>Town of Salem is a multiplayer online game that was first released in 2014. In the classic version of the game, players are randomly assigned roles from a set of different roles, each with unique abilities and goals.
The game is set in the fictional town of Salem, where players are divided into three factions: the Town, the Mafia, and Neutral. The Town's objective is to eliminate all members of the Mafia and Neutral factions, while the Mafia's objective is to eliminate all members of the Town. The Neutral faction's objective varies depending on the role they are assigned.
Each night, players can use their unique abilities to investigate, kill, or protect other players, depending on their role. During the day, players can vote on who they believe is a member of the Mafia and should be put on trial. The player with the most votes is put on trial and can defend themselves before the town decides whether to lynch them or not.
The game ends when one faction achieves their objective or when only one player is left standing. The classic version of the game can be played with up to 15 players, and it requires a keen understanding of strategy, deception, and deduction.</div>
                    </div>
                </div>
            </div> 
           
        </div>
    );
 }

export default Help;

