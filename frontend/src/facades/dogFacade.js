import { makeOptions, handleHttpErrors } from "./fetchUtils";
import { loginURL as URL } from "./settings";

export const setDogs = (breed, sex, age, name) => {
  const options = makeOptions("POST", true, {
    breed: breed,
    sex: sex,
    age: age,
    name: name,
  });
  return fetch(URL + "/api/info/user/dogs", options).then(handleHttpErrors);
};

export const getDogs = () => {
  const options = makeOptions("GET", true);
  return fetch(URL + "/api/info/user/dogs", options).then(handleHttpErrors);
};
