import { handleHttpErrors, makeOptions } from "./fetchUtils";
import { jokeURL as url } from "./settings";

function jokeFetcher() {
  const fetchData = () => {
    const options = makeOptions("GET", true);
    return fetch(url, options).then(handleHttpErrors);
  };
  return { fetchData };
}
const facade = jokeFetcher();
export default facade;
