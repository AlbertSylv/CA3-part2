import breedFacade from "../facades/fetchBreedFacade";
import React, { useState, useEffect } from "react";
import "./Home.css";

export default function Breed() {
  const [dataFromServer, setDataFromServer] = useState({ isEmpty: true });
  useEffect(() => {
    breedFacade.fetchData().then((data) => setDataFromServer(data));
  }, []);

  return (
    <div className="content">
      <h1>Random dog breed</h1>
      {dataFromServer.isEmpty ? (
        <p>Loading..</p>
      ) : (
        <>
          <h3>{dataFromServer.breed}</h3>
        </>
      )}
    </div>
  );
}
