import './App.css';
import UserList from './components/UserList.js';
import Action from './components/Action.js';
import RoleList from './components/RoleList.js';
import {useEffect, useState} from "react";
import {makeRole} from './functions/roleFunctions';
import InfoAlert from "./components/InfoAlert";
import Lobby from "./components/Lobby";
import Navbar from './components/Navbar';
import Chat from './components/Chat';
import Login from "./components/Login";
import Signup from "./components/Signup";
import Lobbies from './components/Lobbies';
import stylesChat from './css/chat.module.css';
const { getChatRequest } = require('./functions/requests.js')
const { getUserProfileRequest } = require('./functions/requests.js')
const { getState } = require('./functions/requests.js')
const { getLobbies } = require('./functions/requests.js')



let lobbyId = "000000";
let token = "";

const mapIdToUsers = new Map();
const mapUsersToId = new Map();


function makeUser() {
  let user = {
    userName: "Username" + Math.floor(Math.random() * 100),
    isAlive: Math.floor(Math.random() * 2) == 1 ? false : true,
    id: Math.floor(Math.random() * 10000),
  };
  return user;
}

let userName = "";

function setName(name){
  userName = name;
  console.log("Am setat username: " + userName);
  sessionStorage.setItem("userName", userName);
}

function getName(){
  return sessionStorage.getItem("userName");
}

function getToken(){
  return sessionStorage.getItem("token");
}

function getLobbyId(){
  return sessionStorage.getItem("lobbyId");
}

let usersList = [];
let rolesList = [];
let lobbies = [];
let lastState = "";

let currentGameState = {
  state: "lobby",
  timeEndState: 30
};

for (let i = 0; i < 13; i++)
{
  rolesList.push(makeRole(i));
}

// VARIANTA DE TEST. PENTRU FINAL, PUR SI SIMPLU COMENTAT ASTA
// SI FOLOSIT getState din requests.js, ( de decomentat sus )

// async function getState(lobbyId, token) {
//   let url = '../gameState.json';
//   try {
//       let res = await fetch(url);
//       return await res.json();
//   } catch (error) {
//       console.log(error);
//   }
// }


let currentUser = {
  userName: ""
};
let timeLeftJson = 0;
let judgedCharacter = "";
let messages = [];

async function createLobbies(token) {
  let lobbiesJson = await getLobbies(token);

  lobbies = lobbiesJson.lobbies;
}

async function createObjects(token) {

  let gameStateJson = await getState(lobbyId, token);

  //if (gameStateJson.errorStatus !== null || gameStateJson.errorStatus !== undefined)
  //  return -1;

  currentGameState = {
    state: "",
    timeEndState: 0
  };
  currentGameState.state = gameStateJson.state;
  currentGameState.timeEndState = gameStateJson.timeEndState;

  if (gameStateJson.state !== "Lobby")
  {

  currentUser = gameStateJson.currentUser;
  currentUser.userName = getName();
  usersList = gameStateJson.users;
  for (let i = 0; i < usersList.length; i++)
  {
    // usersList[i].userId = usersList[i].username;
    if (mapIdToUsers.get(usersList[i].userId) === undefined) {
      {
        let response = await getUserProfileRequest(usersList[i].userId, token);
        //let response = 1;
        if (response.errorStatus !== null && response.errorStatus !== undefined) {
          mapIdToUsers.set(usersList[i].userId, "Casutuu" + usersList[i].userId);
          mapUsersToId.set("Casutuu" + usersList[i].userId, usersList[i].userId);
        }
        else
        {
          mapIdToUsers.set(usersList[i].userId, response);
          mapUsersToId.set(response, usersList[i].userId);
        }
      }
    }
    usersList[i].userName = mapIdToUsers.get(usersList[i].userId);
  }

  judgedCharacter = gameStateJson.judgedCharacter;
  judgedCharacter = mapIdToUsers.get(judgedCharacter);

  const utcTimestamp = new Date().getTime();
  timeLeftJson = Math.floor((currentGameState.timeEndState - utcTimestamp) / 1000);
  console.log(timeLeftJson);

  //if (currentGameState.state === "Discussion")
  if (true)
  {
    // request-ul aici, ar trebui schimbat 0 si 0 cu lobbyId si tokenUser

    let newMessages = [];
    if (messages.length > 0)
      newMessages = await getChatRequest(lobbyId, messages[messages.length - 1].createdAt, token);
    else
      newMessages = await getChatRequest(lobbyId, 1, token);

    // add new messages
    if (!(newMessages.errorStatus !== null && newMessages.errorStatus !== undefined))
    {
      for (let i = 0; i < newMessages.length; i++)
      {
        if (newMessages[i].createdAt !== null && newMessages[i].createdAt !== undefined)
        {
          const exists = messages.some(item => (item.createdAt === newMessages[i].createdAt && item.content === newMessages[i].content));
          if (!exists)
              //if (!messages.includes(newMessages[i]))
          {
            newMessages[i].userName = mapIdToUsers.get(newMessages[i].userId);
            messages.push(newMessages[i]);
            
            let chatDiv = document.getElementById(stylesChat.chatContainer);
            if (chatDiv) {
                chatDiv.scrollTop = chatDiv.scrollHeight;
            }
          }
        }
      }
    }

    // sort messages by createdAt field
    messages.sort(function(a, b) {
      if (a.createdAt < b.createdAt) return -1;
      if (a.createdAt > b.createdAt) return 1;
      return 0;
    });
  }

  }
  return 1;
}

function App() {
  token = getToken();
  lobbyId = getLobbyId();

  const [gameState, setGameState] = useState(currentGameState);
  const [timeLeft, setTimeLeft] = useState();

  useEffect(() => {
    const interval = setInterval(() => {
      token = getToken();

      const utcTimestamp = new Date().getTime();
      timeLeftJson = Math.floor((currentGameState.timeEndState - utcTimestamp) / 1000);

      if (token !== undefined && token !== null && !window.location.pathname.startsWith("/lobbies")) {
        if (timeLeftJson <= 0) 
          lastState = "CHANGE";
        else
          lastState = currentGameState.state;
        createObjects(token);
        setGameState(currentGameState);
      }

      if (token !== undefined && token !== null && window.location.pathname.startsWith("/lobbies")) {
        createLobbies(token);
      }

      setTimeLeft(timeLeftJson);
      
    }, 1000);

    return () => clearInterval(interval)
  }, []);

  if (token === null)
  {
    //console.log(window.location.pathname);
    if (window.location.pathname.startsWith("/signup")) {
      return (
        <div className='app'>
          <div className="content">
            <Signup/>
          </div>
        </div>
      );
    }
    else
    {
      return (
        <div className='app'>
          <div className="content">
            <Login/>
          </div>
        </div>
      );
    }
  }
  else
  {
    if (window.location.pathname.startsWith("/lobbies")) {
      
      if (lobbies.errorStatus !== null && lobbies.errorStatus !== undefined)
      {
        return (
          <div className='app'>
            <div className='content'></div>
          </div>
        );
      }
      else
      {
        for (let i = 0; i < lobbies.length; i++)
        {
          lobbies[i].id = lobbies[i].joinCode;
          lobbies[i].users = lobbies[i].noUsers;
        }
        return (
          <div className='app'>
            <div className="content">
              <Lobbies lobbies = {lobbies} token={token}/>
            </div>
          </div>
        );
      }
    }
    else {
      if (gameState.state == "End") {
        return (
          <div className='app'>
            <p>This is the end of the game. To be done</p>
          </div>
        );
      }
      if (gameState.state != "Lobby")
      {
        if (!currentUser.isAlive) {
          return (
            <div className="app">
            <Navbar
                currentUser={currentUser}
              userName={currentUser.userName}
              role={currentUser.role}
              lobbyId = {lobbyId}
              token = {token}
            />
            <div className="content">
              <InfoAlert
                gameState={gameState}
                timeLeft={timeLeft}
                currentUser={currentUser}
                judgedCharacter={judgedCharacter}
                mapIdToUsers={mapIdToUsers}
              />

              <div className="userList-action">
                <div className="chat-users-container">
                  <Chat 
                    messages={messages}
                    currentUser={currentUser}
                  />
                  <UserList
                    usersList={usersList}
                    gameState={gameState}
                    currentUser={currentUser}
                    lobbyId = {lobbyId}
                    token = {token}
                    lastState={lastState}
                  />
                </div>

                <div id="deadBanner"></div>

              </div>


              <div className="roleList">
                <RoleList rolesList={rolesList} />
              </div>
            </div>
          </div>
          );
        }
        return (
          <div className="app">
            <Navbar
              mapIdToUsers={mapIdToUsers}
              userName={currentUser.userName}
              role={currentUser.role}
              lobbyId = {lobbyId}
              token = {token}
            />
            <div className="content">
              <InfoAlert
                gameState={gameState}
                timeLeft={timeLeft}
                currentUser={currentUser}
                judgedCharacter={judgedCharacter}
                mapIdToUsers={mapIdToUsers}
              />

              <div className="userList-action">
                <div className="chat-users-container">
                  <Chat 
                    messages={messages}
                    currentUser={currentUser}
                  />
                  <UserList
                    usersList={usersList}
                    gameState={gameState}
                    currentUser={currentUser}
                    lobbyId = {lobbyId}
                    token = {token}
                    lastState={lastState}
                  />
                </div>
                <div className='chat-action-container'>
                  <Action
                    gameState={gameState}
                    currentUser={currentUser}
                    judgedCharacter={judgedCharacter}
                    mapUsersToId = {mapUsersToId}
                    lobbyId = {lobbyId}
                    token = {token}
                    isChat = {true}
                  />
                  <Action
                    gameState={gameState}
                    currentUser={currentUser}
                    judgedCharacter={judgedCharacter}
                    mapUsersToId = {mapUsersToId}
                    lobbyId = {lobbyId}
                    token = {token}
                    isChat = {false}
                    lastState={lastState}
                  />
                </div>
              </div>

              <div className="roleList">
                <RoleList rolesList={rolesList} />
              </div>
            </div>
          </div>
      );
      }
      else
      {
        return (
          <div className='app'>
            <Lobby setName = {setName} token = {token} lobbyId = {lobbyId}/>
          </div>
        );
      }
    }
  }
}

export default App;