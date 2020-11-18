import token, { makeOptions, handleHttpErrors } from "./fetchUtils";
import { loginURL as URL, signUpURL as url } from "./settings";

function apiFacade() {
  const setToken = (token) => token.setToken(token);
  const getToken = () => token.getToken();
  const loggedIn = () => token.loggedIn();
  const logout = () => token.logout();

  const login = (user, password) => {
    const options = makeOptions("POST", true, {
      username: user,
      password: password,
    });

    return fetch(URL + "/api/login", options)
      .then(handleHttpErrors)
      .then((res) => {
        token.setToken(res.token);
      });
  };

  const signup = (username, password) => {
    const options = makeOptions("POST", true, {
      username,
      password,
    });
    return fetch(url, options).then(handleHttpErrors);
  };

  const fetchUserRole = (user) => {
    const options = makeOptions("GET", true);
    return fetch(URL + "/api/info/" + user, options).then(handleHttpErrors);
  };

  return {
    login,
    fetchUserRole,
    setToken,
    getToken,
    loggedIn,
    logout,
    signup,
  };
}
const facade = apiFacade();
export default facade;
