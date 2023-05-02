import React, { useEffect, useState } from "react";
import style from "../css/signup.module.css";

function Signup(props)
{
  const [passwordShown, setPasswordShown] = useState(false);
  const [passwordShownc, setPasswordShownc] = useState(false);
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
  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(user);
      fetch("http://localhost:9002/signup/", user).then((res) => {
        alert(res.data.message);
      });
    }
  }, [formErrors]);
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
            type="email" name="email" minLength="1" maxLength="30"  id={style.name} 
            placeholder="Email" onChange={changeHandler} value={user.email}
          />
          <p className={style.error}>{formErrors.email}</p>
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
