import logo from './logo.svg';
import './App.css';
import UserList from './components/UserList.js';
import Action from './components/Action.js';
import { useEffect, useState } from "react";

function makeUser()
{
  let user = {
    userName : "Username" + Math.floor(Math.random() * 100),
    isAlive : ( (Math.floor(Math.random() * 2)) == 1 ) ? false : true,
    id : Math.floor(Math.random() * 10000)
  }
  return user; 
}

let usersList = [];
for (let i = 0; i < 20; i++)
{
  usersList.push(makeUser());
}

let currentUser = {
  roleName: "doctor",
  actionText: "HEAL",
  nrOfSelection: 1
};

let currentGameState = {
  state : "voting",
  time : 30
};

function App() {
  const [gameState, setGameState] = useState(currentGameState);
  const [timeLeft, setTimeLeft] = useState(currentGameState.time);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (timeLeft > 0)
        setTimeLeft(timeLeft - 1);
      else
      {
        clearTimeout(timer);
        let nextGameState;
        if (gameState.state == "voting")
        {
          nextGameState = {
            state : "night",
            time : 45
          };
        }
        else
        {
          nextGameState = {
            state : "voting",
            time : 30
          };
        }

        setGameState(nextGameState);
        setTimeLeft(nextGameState.time);
      }

    }, 1000);

    return () => clearTimeout(timer);
  });

  return (
    <div className='app'>
      <h1>State: {gameState.state} Remaining time {timeLeft}</h1>
      <UserList
        usersList = {usersList} gameState = {gameState} currentUser = {currentUser}
      />
      <Action gameState = {gameState} currentUser = {currentUser} />
    </div>
  );
}

export default App;
