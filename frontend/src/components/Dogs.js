import React, { useState, useEffect } from "react";
import { setDogs, getDogs } from "../facades/dogFacade";
import "./dogs.css";

export default function Dogs() {
  const init = { breed: "", sex: "", age: "", name: "" };
  const [dogInfo, setDogInfo] = useState(init);
  const [userDogs, setUserDogs] = useState([]);

  const addDog = (evt) => {
    evt.preventDefault();

    setDogs(dogInfo.breed, dogInfo.sex, dogInfo.age, dogInfo.name)
      .then((res) => {
        getAllDogs();
      })
      .catch((err) => {
        if (err.status) {
          err.fullError.then((e) => {
            console.log(e);
          });
        } else {
          console.log("Network error");
        }
      });
  };

  function getAllDogs() {
    getDogs()
      .then((data) => setUserDogs([...data.allDogs]))
      .catch((err) => {
        if (err.status) {
          err.fullError.then((e) => {
            console.log(e);
          });
        } else {
          console.log("Network error");
        }
      });
  }

  useEffect(() => {
    getAllDogs();
  }, []);

  const onChange = (evt) => {
    setDogInfo({
      ...dogInfo,
      [evt.target.id]: evt.target.value,
    });
  };
  return (
    <div style={{ textAlign: "center" }}>
      <h1>Add dog</h1>

      <form onChange={onChange} className="form__group">
        <input type="text" id="name" placeholder="Name"></input>
        <input type="number" id="age" placeholder="Age"></input>
        <input type="text" id="sex" placeholder="Male / Female / etc"></input>
        <input type="text" id="breed" placeholder="Breed"></input>

        <button onClick={addDog}>add dog</button>
      </form>
      <br />
      <hr />
      <h1> Your dogs </h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Breed</th>
          </tr>
        </thead>
        <tbody>
          {userDogs.map((dog) => {
            return (
              <tr>
                <td>{dog.name}</td>
                <td>{dog.age}</td>
                <td>{dog.sex}</td>
                <td>{dog.breed}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
