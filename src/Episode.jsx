import React, { useState, useEffect } from 'react';
import base_api from './const'
import moment from 'moment';
import './App.css';
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
      <div className="content-div">
        <h2>Titulo: {data.title}</h2>
        <h2>Temporada: {data.season}</h2>
        <h2>Episodio: {data.episode}</h2>
        <h2>Fecha de estreno: {moment(data.air_date).add(1,'days').format('DD-MM-YYYY')}</h2>
        <h2>Personajes:</h2>
        <div>
          {data.characters && data.characters.map((character) => {
            char_count += 1;
            const link = "/characters/" + character;
            return (
              <div>
                <Link to={link}>{character}</Link>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

export default Episode;
