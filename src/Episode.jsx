import React, { useState, useEffect } from 'react';
import base_api from './const'
import {
    Link
  } from "react-router-dom";
import {
    useParams
  } from "react-router-dom";

function Episode(props) {
    const [data, setData] = useState([]);
    let {id} = useParams();
    let char_count = 0;

    useEffect(() => {
      async function fetchData() {
          try {
              const response = await fetch(
                base_api+'episodes/'+id
              );
              const json = await response.json();
              console.log(json);
              setData(json[0]);

          } catch (e) {
              console.error(e);
          }
      };
      fetchData();
    }, []);

    return (
      <div>
        <h2>Titulo: {data.title}</h2>
        <h2>Temporada: {data.season}</h2>
        <h2>Episodio: {data.episode}</h2>
        <h2>Fecha de estreno: {data.air_date}</h2>
        <h2>Personajes:</h2>
        <ul>
          {data.characters && data.characters.map((character) => {
            char_count += 1;
            const link = "/characters/" + character;
            return (
              <li key={char_count}>
                <Link to={link}>{character}</Link>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

export default Episode;
