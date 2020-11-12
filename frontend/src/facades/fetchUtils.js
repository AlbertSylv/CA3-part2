const status = utils();

export function handleHttpErrors(res) {
  if (!res.ok) {
    return Promise.reject({ status: res.status, fullError: res.json() });
  }
  return res.json();
}

export const makeOptions = (method, addToken, body) => {
  var opts = {
    method: method,
    headers: {
      "Content-type": "application/json",
      Accept: "application/json",
    },
  };
  if (addToken && status.loggedIn) {
    opts.headers["x-access-token"] = status.getToken();
  }
  if (body) {
    opts.body = JSON.stringify(body);
  }
  return opts;
};

function utils() {
  const setToken = (token) => {
    localStorage.setItem("jwtToken", token);
  };
  const getToken = () => {
    return localStorage.getItem("jwtToken");
  };
  const loggedIn = () => {
    const loggedIn = getToken() != null;
    console.log(loggedIn);
    return loggedIn;
  };
  const logout = () => {
    localStorage.removeItem("jwtToken");
  };
  return {
    setToken,
    getToken,
    loggedIn,
    logout,
  };
}

export default status;

//  default token;
