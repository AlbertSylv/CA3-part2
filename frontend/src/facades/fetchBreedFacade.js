import { handleHttpErrors, makeOptions } from "./fetchUtils";
import { breedURL as breedurl } from "./settings";

function breedFetcher() {
  const fetchData = () => {
    const options = makeOptions("GET", true);
    return fetch(breedurl, options).then(handleHttpErrors);
  };
  return { fetchData };
}

const breedFacade = breedFetcher();
export default breedFacade;
