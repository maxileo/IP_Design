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
const { getChatRequest } = require('./functions/requests.js')


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
  localStorage.setItem("userName", userName);
}

function getName(){
  return localStorage.getItem("userName");
}

let usersList = [];
let rolesList = [];

let currentGameState = {
  state: "lobby",
  timeEndState: 30
};

for (let i = 0; i < 13; i++)
{
  rolesList.push(makeRole(i));
}

/*
// VARIANTA FINALA
async function getState() {
  let url = `http://localhost:3000/state/0?userId=${currentUser}`;
  try {
      let res = await fetch(
          url);
    return await res.json();
  } catch (error) {
      console.log(error);
  }
}
*/

// VARIANTA DE TEST
async function getState() {
  let url = '../gameState.json';
  try {
      let res = await fetch(url);
      return await res.json();
  } catch (error) {
      console.log(error);
  }
}

let currentUser = "Casu";
let timeLeftJson = 0;
let judgedCharacter = "";
let messages = [];

async function createObjects() {
  let gameStateJson = await getState();

  currentUser = gameStateJson.currentUser;
  currentUser.userName = getName();
  usersList = gameStateJson.users;

  currentGameState = {
    state: "",
    timeEndState: 0
  };
  currentGameState.state = gameStateJson.state;
  currentGameState.timeEndState = gameStateJson.timeEndState;

  judgedCharacter = gameStateJson.judgedCharacter;

  const utcTimestamp = new Date().getTime();
  timeLeftJson = currentGameState.timeEndState - Math.floor(utcTimestamp / 1000);
  console.log(currentGameState.timeEndState - Math.floor(utcTimestamp / 1000));

  if (currentGameState.state === "Discussion")
  {
    // request-ul aici, ar trebui schimbat 0 si 0 cu lobbyId si tokenUser
    /*
    let newMessages = [];
    if (messages.length > 0)
      newMessages = await getChatRequest(0, messages[messages.length - 1].createdAt, 0);
    else
      newMessages = await getChatRequest(0, utcTimestamp - 10000, 0);
    
    // add new messages
    for (let message in newMessages)
    {
      if (!messages.includes(message))
      {
        messages.push(message);
      }
    }
    */

    // de test
    messages = [
      {
        userName: "Mihai",
        content: "Who seems sus??",
        createdAt: 1682301505
      },
      {
      userName: "Casutu",
      content: "This is my message, I believe the mafioso is dienus!",
      createdAt: 1682300005
      },
      {
      userName: "Diana",
      content: "Noo :(",
      createdAt: 1682300505
      }
    ];

    // sort messages by createdAt field
    messages.sort(function(a, b) {
      if (a.createdAt < b.createdAt) return -1;
      if (a.createdAt > b.createdAt) return 1;
      return 0;
    });
  }
}

function App() {

  const [gameState, setGameState] = useState(currentGameState);
  const [timeLeft, setTimeLeft] = useState();

  createObjects();

  useEffect(() => {
    const timer = setTimeout(() => {
      createObjects();

      setGameState(currentGameState);
      setTimeLeft(timeLeftJson);
      
    }, 200);

    return () => clearTimeout(timer);
  });


  if (gameState.state != "Lobby")
  {
    return (
      <div className="app">
        <Navbar
          userName={currentUser.userName}
          roleName={currentUser.roleName}
        />
        <div className="content">
          <InfoAlert
            gameState={gameState}
            timeLeft={timeLeft}
            currentUser={currentUser}
            judgedCharacter={judgedCharacter}
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
              />
            </div>
            <Action
              gameState={gameState}
              currentUser={currentUser}
              judgedCharacter={judgedCharacter}
            />
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
        <Lobby setName = {setName}/>
      </div>
    );
  }
}

export default App;