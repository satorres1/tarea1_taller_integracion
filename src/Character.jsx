import React, { useState, useEffect } from "react";
import base_api from './const'
import './App.css';
import {
  Link
} from "react-router-dom";
import {
  useParams
} from "react-router-dom";

function Character(props) {
  let {name} = useParams();
  const name_with_plus = name.replace(' ', '+')
  let occupation_count = 0;
  let appearance_bb_count = 0;
  let appearance_bcs_count = 0;

  const [data, setData] = useState({});
  const [frases, setFrases] = useState([]);

  useEffect(() => {
      // GET request using fetch inside useEffect React hook
      fetch(base_api+'characters?name='+name_with_plus)
          .then(response => response.json())
          .then(data => setData(data[0]));

      
      fetch(base_api+'quote?author='+name_with_plus)
          .then(response => response.json())
          .then(frases => setFrases(frases));
  // empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, []);

  return (
    <div className="content-div">
      <h2>Nombre: {data.name}</h2>
      
      <h2>Ocupaciones: </h2>
      <div>
        {data.occupation && data.occupation.map((o) => {
          occupation_count += 1;
          return (
            <div>
              <h3>{o}</h3>
            </div>
          );
        })}
      </div>

      <h2>Imagen: </h2>
      <img src={data.img} alt="Imagen" width="200" ></img>
      <h2>Estado: {data.status}</h2>
      <h2>Apodo: {data.nickname}</h2>

      <h2>Apariciones en BB: </h2>
      <div>
        {data.appearance && data.appearance.map((temporada) => {
          appearance_bb_count += 1;
          return (
            <div>
              <Link to={"/season/Breaking+Bad/" + temporada}>{"Temporada numero " + temporada}</Link>
            </div>
          );
        })}
      </div>

      <h2>Apariciones en BCS: </h2>
      <div>
        {data.better_call_saul_appearance && data.better_call_saul_appearance.map((temporada) => {
          appearance_bcs_count += 1;
          return (
            <div>
              <Link to={"/season/Better+Call+Saul/" + temporada}>{"Temporada numero " + temporada}</Link>
            </div>
          );
        })}
      </div>

      <h2>Actor/Actriz: {data.portrayed}</h2>
      <h2>Categoria: {data.category}</h2>
      <h2>Frases del personaje: </h2>
      <div>
        {frases && frases.map((frase) => {
          return (
            <div>
              <h2>- {frase.quote}</h2>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Character;