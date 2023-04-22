import logo from './logo.svg';
import './App.css';
import UserList from './components/UserList.js';
import Action from './components/Action.js';
import RoleList from './components/RoleList.js';
import { useEffect, useState } from "react";
import { makeRole } from './functions/roleFunctions';
import InfoAlert from "./components/InfoAlert";

function makeUser() {
  let user = {
    userName: "Username" + Math.floor(Math.random() * 100),
    isAlive: Math.floor(Math.random() * 2) == 1 ? false : true,
    id: Math.floor(Math.random() * 10000),
  };
  return user;
}

let usersList = [];
let rolesList = [];

let currentGameState = {
  state: "voting",
  time: 30
};

for (let i = 0; i < 13; i++)
{
  rolesList.push(makeRole(i));
}

async function getState() {
  let url = '../gameState.json';
  try {
      let res = await fetch(url);
      return await res.json();
  } catch (error) {
      console.log(error);
  }
}

let currentUser;
let timeLeftJson;

async function createObjects() {
  let gameStateJson = await getState();

  currentUser = gameStateJson.currentUser;
  usersList = gameStateJson.users;

  currentGameState = gameStateJson.currentGameState;

  const utcTimestamp = new Date().getTime();
  timeLeftJson = currentGameState.timeEndState - Math.floor(utcTimestamp / 1000);
  console.log(currentGameState.timeEndState - Math.floor(utcTimestamp / 1000));
}

function App() {

  const [gameState, setGameState] = useState(currentGameState);
  const [timeLeft, setTimeLeft] = useState(currentGameState.time);

  createObjects();

  useEffect(() => {
    const timer = setTimeout(() => {
      createObjects();

      setGameState(currentGameState);
      if (timeLeftJson > 0)
      {
        setTimeLeft(timeLeftJson);
      }
    }, 1000);

    return () => clearTimeout(timer);
  });

  return (
    <div className='app'>
      <InfoAlert
        gameState={gameState}
        timeLeft={timeLeft}
        currentUser={currentUser}
      />
      <div className='userList-action'>
        <UserList
          usersList = {usersList} gameState = {gameState} currentUser = {currentUser}
        />
        <Action gameState = {gameState} currentUser = {currentUser} />
      </div>

      <div className='roleList'>
        <RoleList
          rolesList = {rolesList}
        />
      </div>
    </div>
  );
}

export default App;