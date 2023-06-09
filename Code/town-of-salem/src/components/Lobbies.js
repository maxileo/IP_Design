import styles from '../css/lobbies.module.css';
import LobbyContainer from './LobbyContainer';
import { useState } from "react";
const { createNewLobby } = require('../functions/requests.js')


let lobbies = [{id: "ABC-DEF", users: 7}];
for (let i = 0; i < 20; i++)
    lobbies.push({id: "XGH-5JK", users: 3});

async function handleCreateLobbyClick(token)
{
    //let response = await sendCreateLobbyRequest(token);
    let response = await createNewLobby(token);
}

function handleCreateLobbyContainer(lobby, searchValue, token)
{
    if (lobby.id === searchValue || searchValue === "") {
        return (
            <LobbyContainer 
                id = {lobby.id}
                users = {lobby.users}
                token = {token}
            />
        );
    }
}



function handleSearchClick(setSearchValue)
{
    const searchElem = document.getElementById(styles.searchInput);
    const searchValue = searchElem.value;
    setSearchValue(searchValue);
}

function Lobbies(props)
{
    const [searchValue, setSearchValue] = useState("");
    lobbies = props.lobbies;

    if (lobbies.length > 0)
    {
    return (
        <div className={styles.lobbies}>
            <div className={styles.topBar}>
                <div className={styles.buttonBackgroundLobby}>
                    <button id={styles.createButton}
                        onClick={e => handleCreateLobbyClick(props.token)}
                    >
                        Create Lobby
                    </button>
                </div>
                <input type="text" placeholder="Search by ID" id={styles.searchInput} />
                <div className={styles.buttonBackgroundLobby}>
                    <button id={styles.searchButton}
                        onClick={e => handleSearchClick(setSearchValue)}    
                    >
                        <i className="fas fa-search"></i>
                    </button>
                </div>
            </div>
            <div className={styles.lobbyContainerWrapper}>
                {lobbies.map((lobby) => handleCreateLobbyContainer(lobby, searchValue, props.token) )}
            </div>
        </div>
    );
    }
    else {
        return (<div></div>);
    }
}

export default Lobbies;