import facade from "../facades/fetchFacade";
import React, { useState, useEffect } from "react";
import "./Home.css";

export default function Home() {
  const [dataFromServer, setDataFromServer] = useState({ isEmpty: true });
  useEffect(() => {
    facade.fetchData().then((data) => setDataFromServer(data));
  }, []);

  return (
    <div className="content">
      <h1 className="jokes">Jokes</h1>
      {dataFromServer.isEmpty ? (
        <p>Loading..</p>
      ) : (
        <>
          <h3 className="jokes">{dataFromServer.joke1}</h3>
          <h3 className="jokes">{dataFromServer.joke2}</h3>
          <h3 className="jokes">{dataFromServer.joke3}</h3>
          <h3 className="jokes">{dataFromServer.joke4}</h3>
          <h3 className="jokes">{dataFromServer.joke5}</h3>
        </>
      )}
    </div>
  );
}
