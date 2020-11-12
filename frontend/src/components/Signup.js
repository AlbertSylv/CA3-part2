import facade from "../facades/LoginFacade";
import React, { useState, useEffect } from "react";
import "./Login.css";
import { Link } from "react-router-dom";

function Signup({ login, user }) {
  const init = { username: "", password1: "", password2: "" };
  const [loginCredentials, setLoginCredentials] = useState(init);
  const [error, setError] = useState("");

  const performLogin = (evt) => {
    evt.preventDefault();
    if (
      loginCredentials.password1.length > 0 &&
      loginCredentials.password2.length > 0 &&
      loginCredentials.username.length > 0
    ) {
      if (loginCredentials.password1 === loginCredentials.password2) {
        facade
          .signup(loginCredentials.username, loginCredentials.password1)
          .then((data) => console.log(data))
          .catch((err) => {
            if (err.status) {
              err.fullError.then((e) => {
                setError(e.message);
              });
            } else {
              setError("Network error");
            }
          });
      } else {
        setError("Password doesn't match");
      }
    } else {
        setError("You must write in all fields");
    }
  };
  const onChange = (evt) => {
    setLoginCredentials({
      ...loginCredentials,
      [evt.target.id]: evt.target.value,
    });
  };

  return (
    <div className="login">
      <h2>Sign-up</h2>
      <form onChange={onChange} className="form__group">
        <div className="input">
          <input
            type="input"
            className="form__field"
            placeholder="Name"
            name="username"
            id="username"
            required
          />
        </div>
        <div className="input">
          <input
            type="password"
            className="form__field"
            placeholder="Password"
            name="password1"
            id="password1"
            required
          />
        </div>
        <div className="input">
          <input
            type="password"
            className="form__field"
            placeholder="Password"
            name="password2"
            id="password2"
            required
          />
        </div>
        <button onClick={performLogin}>Login</button>
      </form>
      {user !== "Loading..." ? user : <> </>}
      <Link to="/signup">Sign-up</Link>
      <p>{error}</p>
    </div>
  );
}

export default Signup;
