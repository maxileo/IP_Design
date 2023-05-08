import React, { useEffect, useState } from "react";
import style from "../css/signup.module.css";
const { registerRequest } = require('../functions/requests.js')

function Signup(props)
{
  const [passwordShown, setPasswordShown] = useState(false);
  const [passwordShownc, setPasswordShownc] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [user, setUserDetails] = useState({
    username:"",
    password: "",
    cpassword: "",
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
    if (!values.cpassword) {
      error.cpassword = "Confirm Password is required";
    } else if (values.cpassword !== values.password) {
      error.cpassword = "Confirm password and password should be same";
    }  
    return error;
  };

  const signupHandler = async (e) => {
    e.preventDefault();
    setFormErrors(validateForm(user));

    if (Object.keys(formErrors).length === 0) {
        let response = await registerRequest(user.username, user.password);
        console.log(response);
        if (response["token"] !== null && response["token"] !== undefined)
        {
            console.log(response["token"]);
            localStorage.setItem("token", response["token"]);
            localStorage.setItem("userName", user.username);
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
  const togglePasswordc = (e) => {
    setPasswordShownc(!passwordShownc);
    e.preventDefault();
  };
  return (
    <div className={style.signup}>
      <form>
        <h1 class={style.center}>CREATE YOUR ACCOUNT</h1>
          <input
             name="username" id={style.name} placeholder="Username" onChange={changeHandler} value={user.username}
          />
          
        <p className={style.error}>{formErrors.username}</p>
        
        <div class={style.pass}>
        <input label="password" minLength="8" maxLength="15" id={style.name}
        name="password" secureTextEntru={true} placeholder="Password" onChange={changeHandler}
        value={user.password} type={passwordShown ? "text" : "password"}></input>
        <button class={style.buttonShow} id={style.name} onClick={togglePassword}>Show</button>
        
      </div>
       <p className={style.error}>{formErrors.password}</p>
       <div class={style.pass}>
        <input label="password" minLength="8" maxLength="15" id={style.name} 
        name="cpassword" secureTextEntru={true} placeholder="Confirm Password" onChange={changeHandler} 
        value={user.cpassword}type={passwordShownc ? "text" : "password"}></input>
         <button class={style.buttonShow} id={style.name} onClick={togglePasswordc}>Show</button>

        </div>
          <p className={style.error}>{formErrors.cpassword}</p>


          <div class={style.buttonBackgroundLogin}>
                <button 
                    onClick={signupHandler}
                    id={style.start} className={style.buttonSignup}>Create account</button>
            </div>

            </form>
       
        <a className={style.nav} href="/login">Already registered? Login</a>
        
 </div>
  );
};
export default Signup;