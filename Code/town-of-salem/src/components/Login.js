import React, { useState,useEffect } from "react";
import loginstyle from "../css/login.module.css";
const { loginRequest } = require('../functions/requests.js')

const Login = ({ setUserState }) => {
  const [passwordShown, setPasswordShown] = useState(false);

  const [formErrors, setFormErrors] = useState({});
  const [user, setUserDetails] = useState({
    username: "",
    password: "",
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...user,
      [name]: value,
    });
  };
  const validateForm = (values) => {
    const error = {};
    if (!values.username) {
      error.username = "Username is required";
    } else if (values.username.length < 4) {
      error.username = "Username must be more than 4 characters";
    }   
    if (!values.password) {
      error.password = "Password is required";
    } else if (values.password.length < 4) {
      error.password = "Password must be more than 4 characters";
    }   
    return error;
  };

  const loginHandler = (e) => {
    e.preventDefault();
    setFormErrors(validateForm(user));
    
    if (Object.keys(formErrors).length === 0) {
        let response = loginRequest(user.username, user.password);
        console.log(response);
        if (response["token"] !== null && response["token"] !== undefined)
        {
            console.log(response["token"]);
            localStorage.setItem("token", response["token"]);
        }
        else
        {
            if (response["message"] !== null && response["message"] !== undefined)
                alert(response["message"]);
            else
                alert("An error occured, please try again.");
        }
    }
  };

  const togglePassword = (e) => {
    setPasswordShown(!passwordShown);
    e.preventDefault();
  };
  return (
    <div className={loginstyle.login}>
      <form>
        <h1 class={loginstyle.center}>LOGIN</h1>
        <input  name="username" minLength="1" maxLength="30" id={loginstyle.name}
          placeholder="Username"
          onChange={changeHandler}
          value={user.username}
        />
        
        <p className={loginstyle.error}>{formErrors.username}</p>
        
        <div class={loginstyle.pass}>
        <input label="password" minLength="8" maxLength="15" id={loginstyle.name}
        name="password" secureTextEntru={true} placeholder="Password" onChange={changeHandler}
        value={user.password} type={passwordShown ? "text" : "password"}></input>
        <button class={loginstyle.buttonShow} id={loginstyle.name} onClick={togglePassword}>Show</button>
        
      </div>

        <p className={loginstyle.error}>{formErrors.password}</p>

        <div class={loginstyle.buttonBackgroundLogin}>
                <button 
                    onClick={loginHandler}
                    id={loginstyle.start} className={loginstyle.buttonLogin}>LOGIN
                </button>
            </div>


      </form>
      <a className={loginstyle.nav} href="signup">Not yet registered? Register Now</a>
    </div>
  );
};
export default Login;