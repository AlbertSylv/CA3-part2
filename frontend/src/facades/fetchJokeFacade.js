import { handleHttpErrors, makeOptions } from "./fetchUtils";
import { jokeURL as url } from "./settings";

function jokeFetcher() {
  const fetchData = () => {
    const options = makeOptions("GET", true);
    return fetch(url, options).then(handleHttpErrors);
  };
  return { fetchData };
}

const jokeFacade = jokeFetcher();
export default jokeFacade;
