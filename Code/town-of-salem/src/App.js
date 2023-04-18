import logo from './logo.svg';
import './App.css';
import UserList from './components/UserList.js';
import Action from './components/Action.js';
import RoleList from './components/RoleList.js';

function makeUser()
{
  let user = {
    userName : "Username" + Math.floor(Math.random() * 100),
    isAlive : ( (Math.floor(Math.random() * 2)) == 1 ) ? false : true,
    id : Math.floor(Math.random() * 10000)
  }
  return user; 
}

function makeRole(i)
{
  let possibleRoles = ["Sheriff", "Lookout", "Doctor"];
  let role = {
    roleName : possibleRoles[i],
    id : Math.floor(Math.random() * 10000)
  }
  return role;
}

function App() {

  let usersList = [];
  let rolesList = [];

  for (let i = 0; i < 20; i++)
  {
    usersList.push(makeUser());
  }
  for (let i = 0; i < 3; i++)
  {
    rolesList.push(makeRole(i));
    // console.log(makeRole(i));
  }

  // console.log(rolesList);

  return (
    <div className='app'>
      <div className='userList-action'>
        <UserList
          usersList = {usersList}
        />
        <Action/>
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