import React, { useState,useEffect } from "react";
import loginstyle from "../css/login.module.css";

const Login = ({ setUserState }) => {
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
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
    setIsSubmit(true);
    // if (!formErrors) {

    // }
  };
  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(user);
      fetch('http://localhost:9002/login', user).then((res) => {
        alert(res.data.message);
        setUserState(res.data.user);
      });
    }
  }, [formErrors]);
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
        
        <input type="password" minLength="8" maxLength="15" id={loginstyle.name}
        name="password"
        placeholder="Password"
        onChange={changeHandler}
        value={user.password}></input>

   
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
