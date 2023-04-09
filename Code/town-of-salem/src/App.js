import logo from './logo.svg';
import './App.css';
import UserList from './components/UserList.js';
import Action from './components/Action.js';

function makeUser()
{
  let user = {
    userName : "Username" + Math.floor(Math.random() * 100),
    isAlive : ( (Math.floor(Math.random() * 2)) == 1 ) ? false : true,
    id : Math.floor(Math.random() * 10000)
  }
  return user; 
}

function App() {

  let usersList = [];
  for (let i = 0; i < 20; i++)
  {
    usersList.push(makeUser());
  }
  return (
    <div className='app'>
      <UserList
        usersList = {usersList}
      />
      <Action/>
    </div>
  );
}

export default App;
