import React, { useEffect, useState } from "react";
import style from "../css/signup.module.css";
import { useNavigate, NavLink } from "react-router-dom";
  async function postData(url, data)
  {
      try {
          const response = await fetch(url, {
              method: 'POST',
              body: JSON.stringify(data),
              headers: {
                  "Content-Type": "application/json"
              }
          });
      } catch ( error ) {
          console.log(error);
      }
  }
  async function SignupClick(pressed)
{
    if (pressed)
    {
        let data = {
            start: true
        };

        await postData("http://localhost:3000/state/0", data);
    }
}
function Signup(props)
{
const [pressed, setPressed] = useState(false);

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [user, setUserDetails] = useState({
    email: "",
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
    const regex = /^[^\s+@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.email) {
      error.email = "Email is required";
    } else if (!regex.test(values.email)) {
      error.email = "This is not a valid email format!";
    }
    if (!values.username) {
      error.username = "Username is required";
    } else if (values.username.length < 4) {
      error.username = "Username must be more than 4 characters";
    } 
    if (!values.password) {
      error.password = "Password is required";
    } else if (values.password.length < 4) {
      error.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      error.password = "Password cannot exceed more than 10 characters";
    }
    if (!values.cpassword) {
      error.cpassword = "Confirm Password is required";
    } else if (values.cpassword !== values.password) {
      error.cpassword = "Confirm password and password should be same";
    }  
    return error;
  };
  const signupHandler = (e) => {
    e.preventDefault();
    setFormErrors(validateForm(user));
    setIsSubmit(true);
    // if (!formErrors) {
    //   setIsSubmit(true);
    // }
  };



  return (
    <div className={style.signup}>
      <form>
        <h1 class={style.center}>Create your account</h1>
        <input
            type="email" name="email" minLength="1" maxLength="30"  id={style.name} 
            placeholder="Email" onChange={changeHandler} value={user.email}
          />
          <p className={style.error}>{formErrors.email}</p>
          <input
             name="username" id={style.name} placeholder="Username" onChange={changeHandler} value={user.username}
          />
          
        <p className={style.error}>{formErrors.username}</p>
        
        <input label="password" minLength="8" maxLength="15" id={style.name}
        name="password"
        secureTextEntru={true}
        placeholder="Password"
        onChange={changeHandler}
        value={user.password}></input>

   
        <p className={style.error}>{formErrors.password}</p>
        <input type="password" name="cpassword" id={style.name} placeholder="Confirm Password" onChange={changeHandler} value={user.cpassword}
          />
          <p className={style.error}>{formErrors.cpassword}</p>
          <div class={style.buttonBackgroundLogin}>
                <button 
                    onClick={signupHandler}
                    id={style.start} className={style.buttonSignup}>Create account                </button>
            </div>

            </form>
       
        <a className={style.nav} href="/login">Already registered? Login</a>
        
 </div>
  );
};
export default Signup;
