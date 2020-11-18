import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
  Redirect,
} from "react-router-dom";
import Login from "./components/Login";
import facade from "./facades/LoginFacade";
import Home from "./components/Home";
import Breed from "./components/Breed";
import Signup from "./components/Signup";
import { setDogs } from "./facades/dogFacade";
import Dogs from "./components/Dogs";

function App() {
  const [user, setUser] = useState("Loading...");
  const [loggedIn, setLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState([]);

  const login = (user, pass) => {
    facade
      .login(user, pass)
      .then((res) => {
        setLoggedIn(true);
      })
      .catch((err) => {
        if (err.status) {
          err.fullError.then((e) => {
            setUser(e.message);
          });
        } else {
          console.log("Network error");
        }
      });
  };

  const logout = () => {
    facade.logout();
    setUser("Loading...");
    setLoggedIn(false);
    setUserRole([]);
  };

  return (
    <>
      <Router>
        <Navbar loggedIn={loggedIn} />
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/breeds" exact>
            <Breed />
          </Route>
          <Route path="/dogs" exact>
            <Dogs />
          </Route>
          <Route path="/services" />
          <Route path="/products" />
          <Route path="/signin">
            <Login
              userRole={userRole}
              setUserRole={setUserRole}
              login={login}
              setUser={setUser}
              user={user}
              loggedIn={loggedIn}
              logout={logout}
              setLoggedIn={setLoggedIn}
            />
          </Route>
          <Route path="/signup">
            <Signup
              userRole={userRole}
              setUserRole={setUserRole}
              login={login}
              setUser={setUser}
              user={user}
              loggedIn={loggedIn}
              logout={logout}
              setLoggedIn={setLoggedIn}
            />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
