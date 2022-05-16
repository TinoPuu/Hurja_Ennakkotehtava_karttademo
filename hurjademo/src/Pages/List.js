import React, { useState, useEffect, Component } from "react";
import axios from "axios";
import "../Styles/list.css";

export default function List() {
  const [coordinates, setCoordinates] = React.useState([]);

  function getCoordinates() {
    axios
      .get("http://localhost:5000/kartta1")
      .then(function (response) {
        setCoordinates(response.data);
        console.log(coordinates);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    getCoordinates();
  }, []);
  return (
    <div>
        <h1>Lista</h1>
      <table>
          <tr>
             <td><p>ID</p></td>
             <td><p>Leveys</p></td>
             <td><p>Korkeus</p></td>
             <td><p>Data</p></td>
          </tr>
        {coordinates.map((coordinate) => (
          <tr key={coordinate.id}>
            <td>{coordinate.id_kartta}</td>
            <td>{coordinate.lat_kartta}</td>
            <td>{coordinate.lng_kartta}</td>
            <td>{coordinate.data_kartta}</td>
          </tr>
        ))}
      </table>
    </div>
  );
}
